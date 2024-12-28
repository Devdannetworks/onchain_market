pub fn validate_payload(payload: &EventPayload) -> Result<(), String> {
    if payload.title.is_empty() || payload.description.is_empty() || payload.category.is_empty() {
        return Err("Invalid input: Title, description, and category cannot be empty.".to_string());
    }
    Ok(())
}