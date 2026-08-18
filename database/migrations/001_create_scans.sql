CREATE TABLE IF NOT EXISTS scans (
  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  target TEXT NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT scans_status_check
    CHECK (status IN ('pending', 'in-progress', 'completed', 'failed'))
);
