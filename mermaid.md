   ```mermaid
sequenceDiagram
    participant GHA as GitHub Actions
    participant SS as Sync Script
    participant GH as GitHub API
    participant SB as Supabase
    participant WEB as Web Frontend

    Note over GHA: Runs every 6 hours
    
    GHA->>SS: Trigger sync
    activate SS
    
    SS->>GH: Fetch contributors
    GH-->>SS: Return contributor list
    
    loop Each Contributor
        SS->>GH: Fetch user details
        GH-->>SS: Return user data
        SS->>SS: Apply role mapping
        SS->>SB: Upsert contributor
        SB-->>SS: Confirm storage
    end
    
    deactivate SS
    
    Note over WEB: User visits page
    
    WEB->>SB: Fetch contributors
    SB-->>WEB: Return contributor data
    WEB->>WEB: Render grid
