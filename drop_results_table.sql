-- Drop the match_results table since the club is moving to Dribl for all fixtures and results.
-- This will safely remove the table and all its data.

DROP TABLE IF EXISTS "public"."results";
