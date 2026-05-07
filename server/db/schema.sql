-- CampusIQ Database Schema

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Colleges table
CREATE TABLE IF NOT EXISTS colleges (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    rating DECIMAL(2,1),
    nirf_rank INTEGER,
    fees VARCHAR(50),
    avg_package VARCHAR(50),
    placement_rate VARCHAR(10),
    courses TEXT, -- Stored as comma separated or JSON
    exams VARCHAR(255),
    type VARCHAR(50), -- Public/Private
    ownership VARCHAR(50),
    specialization TEXT,
    logo_url TEXT,
    banner_url TEXT,
    about TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Saved Colleges table
CREATE TABLE IF NOT EXISTS saved_colleges (
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    college_id INTEGER REFERENCES colleges(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, college_id)
);

-- Compare Tray (Transient, but can be persisted)
CREATE TABLE IF NOT EXISTS compare_history (
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    college_ids INTEGER[], -- Array of up to 3 IDs
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Rank Predictions history
CREATE TABLE IF NOT EXISTS rank_predictions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    rank_input INTEGER,
    category VARCHAR(50),
    location_pref VARCHAR(255),
    course_pref VARCHAR(255),
    predicted_colleges JSONB, -- Store result list
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
