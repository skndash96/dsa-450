CREATE TABLE notes (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  uid uuid REFERENCES auth.users (id),
  qid uuid,
  tid uuid,
  starred boolean DEFAULT false,
  done boolean DEFAULT false,
  text text DEFAULT ''
);

ALTER TABLE notes ADD CONSTRAINT unique_uid_qid UNIQUE (uid, qid);