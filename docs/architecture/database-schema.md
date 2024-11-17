erDiagram
    CONTRIBUTORS {
        string github_username PK
        string name
        string avatar_url
        integer contributions
        string role
        timestamp last_updated
    }

    ROLE_MAPPING {
        string username PK
        string role FK
    }

    CUSTOM_ROLES {
        string role_id PK
        string role_name
        string description
        timestamp created_at
    }

    SYNC_LOGS {
        string log_id PK
        timestamp sync_time
        string status
        text error_message
        integer contributors_updated
    }

    CONTRIBUTORS ||--o{ ROLE_MAPPING : has
    ROLE_MAPPING }o--|| CUSTOM_ROLES : uses
    CONTRIBUTORS ||--o{ SYNC_LOGS : tracked_in