
CREATE TABLE fighters (
            id SERIAL PRIMARY KEY,
            full_name VARCHAR(120) NOT NULL,
            weight_class VARCHAR(30) NOT NULL,
            wins INT DEFAULT 0,
            losses INT DEFAULT 0
          );
          CREATE TABLE events (
            id SERIAL PRIMARY KEY,
            title VARCHAR(120) NOT NULL,
            event_date DATE NOT NULL,
            location VARCHAR(120)
          );
          CREATE TABLE fights (
            id SERIAL PRIMARY KEY,
            event_id INT REFERENCES events(id) ON DELETE CASCADE,
            weight_class VARCHAR(30),
            result_json JSONB,
            fight_order INT
          );
          CREATE TABLE fight_participants (
            fight_id INT REFERENCES fights(id) ON DELETE CASCADE,
            fighter_id INT REFERENCES fighters(id) ON DELETE CASCADE,
            PRIMARY KEY (fight_id, fighter_id)
          );
          CREATE TABLE rankings (
            id SERIAL PRIMARY KEY,
            weight_class VARCHAR(30) NOT NULL,
            fighter_id INT REFERENCES fighters(id) ON DELETE CASCADE,
            position INT NOT NULL,
            UNIQUE (weight_class, position)
          );


ALTER TABLE fighters
        ADD COLUMN knockouts   INT DEFAULT 0,
        ADD COLUMN submissions INT DEFAULT 0,
        ADD COLUMN nationality VARCHAR(120),
        ADD COLUMN team        VARCHAR(120);


![Снимок экрана 2025-04-30 172428](https://github.com/user-attachments/assets/125a9951-e06d-438f-bf62-2905a38cc14c)
