use crate::models::bet_model::BetPayload;
use crate::models::event_model::EventStatus;
use crate::storage::event_store::get_event_storage;
use crate::utils::errors::Error;
use ic_cdk;

#[ic_cdk::update]
pub fn place_bet(bet_payload: BetPayload) -> Result<(), Error> {
    let event_storage_ref = get_event_storage();

    event_storage_ref.with(|s| {
        let event = s.borrow_mut().get(&bet_payload.event_id).clone();

        if let Some(mut event) = event {
            if event.event_status == EventStatus::Settled {
                return Err(Error::Authorization {
                    msg: format!("Event already settled; can't place a bet"),
                });
            }

            let outcome = event
                .outcome
                .iter_mut()
                .find(|o| o.outcome_id == bet_payload.outcome_id)
                .ok_or(Error::NotFound {
                    msg: format!(
                        "Outcome with id={} was not found for this event",
                        bet_payload.outcome_id
                    ),
                })?;

            outcome.total_amount_staked += bet_payload.amount;
            outcome.total_bets += 1;

            if let Some(bets) = event.bets.as_mut() {
                bets.push(bet_payload.clone());
            } else {
                event.bets = Some(vec![bet_payload.clone()]);
            }

            s.borrow_mut().insert(bet_payload.event_id, event.clone());
            Ok(())
        } else {
            Err(Error::NotFound {
                msg: format!("Event with id={} not found!", bet_payload.event_id),
            })
        }
    })
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::models::bet_model::BetType;
    use crate::models::event_model::{Event, EventStatus, Outcome};
    use crate::storage::event_store::get_event_storage;
    use candid::Principal;

    #[test]
    fn test_place_bet() {
        let event = Event {
            event_id: 1,
            title: "Sample Event".to_string(),
            description: "An event for testing.".to_string(),
            created_at: 0,
            updated_at: None,
            amount_staked: Some(1000),
            category: "Sports".to_string(),
            sub_category: "Basketball".to_string(),
            event_status: EventStatus::Open,
            outcome: vec![
                Outcome {
                    outcome_id: 0,
                    description: "Raila wins".to_string(),
                    odds: 2,
                    total_bets: 0,
                    total_amount_staked: 0,
                },
                Outcome {
                    outcome_id: 1,
                    description: "Mahmoud wins".to_string(),
                    odds: 2,
                    total_bets: 0,
                    total_amount_staked: 0,
                },
            ],
            close_time: "2024-12-31T23:59:59Z".to_string(),
            bets: Some(vec![]),
            bet_type: BetType::Binary,
        };

        let bet_payload = BetPayload {
            user_id: Principal::anonymous(),
            event_id: 1,
            outcome_id: 1,
            amount: 100,
        };

        let event_storage = get_event_storage();
        event_storage.with(|s| {
            s.borrow_mut().insert(event.event_id, event);
        });

        let result = place_bet(bet_payload);
        assert!(result.is_ok());

        let updated_event = event_storage.with(|s| {
            s.borrow()
                .get(&1)
                .expect("Failed to retrieve updated event")
                .clone()
        });

        if let Some(bets) = updated_event.bets.as_ref() {
            assert_eq!(bets.len(), 1);
            assert_eq!(bets[0].amount, 100);
        } else {
            panic!("No bets found");
        }
        assert_eq!(updated_event.outcome[1].total_amount_staked, 100);
        assert_eq!(updated_event.outcome[0].total_amount_staked, 0);
    }
}
