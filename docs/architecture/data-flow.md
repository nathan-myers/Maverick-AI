```mermaid
sequenceDiagram
    participant GHA as GitHub Actions
    participant GH as GitHub API
    participant SS as Sync Script
    participant SB as Supabase
    participant WEB as Web Frontend
    participant UI as User Interface

    Note over GHA: Triggers every 6 hours
    
    GHA->>SS: Initialize sync process
    activate SS
    
    SS->>GH: Request contributors list
    Note right of GH: Endpoint: /repos/{owner}/{repo}/contributors
    GH-->>SS: Return contributor data
    
    loop For each contributor
        SS->>GH: Fetch detailed user info
        Note right of GH: Endpoint: /users/{username}
        GH-->>SS: Return user details
        
        SS->>SS: Apply role mapping
        Note right of SS: Map custom roles<br/>Transform data format
        
        SS->>SB: Upsert contributor data
        Note right of SB: Table: contributors
        SB-->>SS: Confirm storage
    end
    
    deactivate SS
    
    WEB->>SB: Request contributors
    activate WEB
    SB-->>WEB: Return contributor list
    
    WEB->>UI: Render contributor grid
    Note right of UI: Display with avatars,<br/>roles, and contribution count
    
    UI-->>WEB: User interaction
    deactivate WEB
