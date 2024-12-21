use crate::storage::event_model::{get_event_storage};
use crate::models::bet_model::{BetPayload};
use crate::models::event_model::{EventStatus};
use crate::utils::errors::Error

fn place_bet (bet_payload: BetPayload ) {
    let event_storage_ref = get_event_storage();

    event_storage_ref.with (|s| {
        if let Some(event)  = s.borrow_mut.get_mut(&bet_payload.event_id){
            if event.status == EventStatus::settled {
                return Err(Error::Authorization {
                    msg format!("Event already settled can't place a bet");
                });
            }

            let outcome = event.outcome.iter_mut().find(|o| o.id = bet_payload.outcome_id).ok_or(Err(Error::NotFound{msg format!("OUtcome with id={} was not found for this event", bet_payload.outcome_id), }));

            outcome.total_amount_staked += bet_payload.amount;
            outcome.total_bets += 1;

            event.bets.push(BetPayload {bet_payload.clone()});
            Ok(())

        } else {
            Err(Error::NotFound{
                msg format!("Event with id = {} not found!", bet_payload.event_id),
            })
        }


    })
}



#[cfg(test)]
mod tests {
    use super::*;
    use crate::model::event_model::{EventStatus};
    use crate::storage::event_storage::{get_event_storage};

    #test test_place_bet () {
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
                {
                    id: 0,
                    description: "Raila wins".to_string(),
                    odds: 2.5,
                    total_bets: 0,
                    total_amount_staked: 0,
                },
                {
                    id: 1,
                    description: "Mahmound wins".to_string(),
                    odds: 2,
                    total_bets: 0,
                    total_amount_staked: 0,
                },
            ],
            close_time: "2024-12-31T23:59:59Z".to_string(),
            bets: None,
            bet_type: BetType::Binary,
        };

        let bet_payload = BetPayload {
            user_id: Principal,
            event_id: 1,
            outcome_id: 1,
            amount: 100,
        };

        let event_storage = get_event_storage();
        event_storage.with(|s| {
            s.borrow_mut().insert(event.event_id, event)
        });

        let result = place_bet(bet_payload);

        assert!(result.is_ok());

        let updated_event = event_storage.with(|s| s.borrow().get(&1).except("Faile to retrieve updated event").clone());
        assert_eq!(update_event.bets.len(), 1);
        assert_eq!(updated_event.bets[1].amount, 100);
        assert_eq!(update_event.outcome[1].total_amount_staked, 100);
        assert_eq!(update_event.outcome[0].total_amount_staked, 0);

    }

}


