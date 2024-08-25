import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1724549013393 implements MigrationInterface {
    name = 'SchemaUpdate1724549013393'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "team" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "groupId" uuid, CONSTRAINT "PK_f57d8293406df4af348402e4b74" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "batting_stats" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "innings" integer NOT NULL DEFAULT '0', "runs" integer NOT NULL DEFAULT '0', "ballsFaced" integer NOT NULL DEFAULT '0', "fours" integer NOT NULL DEFAULT '0', "sixes" integer NOT NULL DEFAULT '0', "highestScore" integer NOT NULL DEFAULT '0', "fifties" integer NOT NULL DEFAULT '0', "hundreds" integer NOT NULL DEFAULT '0', "notOuts" integer NOT NULL DEFAULT '0', "careerStatsId" uuid, CONSTRAINT "PK_d26f50680faccde355fb2fe23ee" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "bowling_stats" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "innings" integer NOT NULL DEFAULT '0', "overs" double precision NOT NULL DEFAULT '0', "maidens" integer NOT NULL DEFAULT '0', "runs" integer NOT NULL DEFAULT '0', "wickets" integer NOT NULL DEFAULT '0', "careerStatsId" uuid, CONSTRAINT "PK_65922a8af4c6ea4cc41bf5ed3a1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "fielding_stats" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "catches" integer NOT NULL DEFAULT '0', "runOuts" integer NOT NULL DEFAULT '0', "stumpings" integer NOT NULL DEFAULT '0', "careerStatsId" uuid, CONSTRAINT "PK_750315bf4feecfaece4d37b648c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "career_stats" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "matches" integer NOT NULL DEFAULT '0', "totalRuns" integer NOT NULL DEFAULT '0', "totalWickets" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_3aa6e3babdc84a25a22477576e4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "match_performance" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "matchId" uuid, "playerId" uuid, CONSTRAINT "PK_1106e3e37bff6758935c416715c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "player" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "role" "public"."player_role_enum" NOT NULL DEFAULT 'Batsman', "battingStyle" "public"."player_battingstyle_enum" NOT NULL DEFAULT 'Right-handed', "bowlingStyle" character varying, "careerStatsId" uuid, CONSTRAINT "REL_4d337145ef77879eec57d21054" UNIQUE ("careerStatsId"), CONSTRAINT "PK_65edadc946a7faf4b638d5e8885" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "group" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_256aa0fda9b1de1a73ee0b7106b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "match" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" TIMESTAMP NOT NULL, "maxOvers" integer NOT NULL, "groupId" uuid, CONSTRAINT "PK_92b6c3a6631dd5b24a67c69f69d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "team_players_player" ("teamId" uuid NOT NULL, "playerId" uuid NOT NULL, CONSTRAINT "PK_30ad7c7427cb452e63ff4d4f9a0" PRIMARY KEY ("teamId", "playerId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_03530e45522b82c6ae46d825dd" ON "team_players_player" ("teamId") `);
        await queryRunner.query(`CREATE INDEX "IDX_a5a5ca467eb43bf810ce32a119" ON "team_players_player" ("playerId") `);
        await queryRunner.query(`CREATE TABLE "group_players_player" ("groupId" uuid NOT NULL, "playerId" uuid NOT NULL, CONSTRAINT "PK_be1d527d48ce088926de3e85176" PRIMARY KEY ("groupId", "playerId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a023341f8241f811d107f635ba" ON "group_players_player" ("groupId") `);
        await queryRunner.query(`CREATE INDEX "IDX_7e397b5ee53b69aaa67a038732" ON "group_players_player" ("playerId") `);
        await queryRunner.query(`CREATE TABLE "match_teams_team" ("matchId" uuid NOT NULL, "teamId" uuid NOT NULL, CONSTRAINT "PK_5e840839aa34237a37a2e4ed01a" PRIMARY KEY ("matchId", "teamId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a25e231842e46b018441c84f00" ON "match_teams_team" ("matchId") `);
        await queryRunner.query(`CREATE INDEX "IDX_1c65d0c6cf67a4c3a06f0fef42" ON "match_teams_team" ("teamId") `);
        await queryRunner.query(`ALTER TABLE "team" ADD CONSTRAINT "FK_96d76e96e2b2b84a0e7e7305e5c" FOREIGN KEY ("groupId") REFERENCES "group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "batting_stats" ADD CONSTRAINT "FK_41287ad678d6f429b9355b45afe" FOREIGN KEY ("careerStatsId") REFERENCES "career_stats"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bowling_stats" ADD CONSTRAINT "FK_b6dd5a75560b42d5c83241604c2" FOREIGN KEY ("careerStatsId") REFERENCES "career_stats"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "fielding_stats" ADD CONSTRAINT "FK_655bd35bf4537fe0f6215fa1ed7" FOREIGN KEY ("careerStatsId") REFERENCES "career_stats"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "match_performance" ADD CONSTRAINT "FK_e37640ba9a6702f03f5f7a2245f" FOREIGN KEY ("matchId") REFERENCES "match"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "match_performance" ADD CONSTRAINT "FK_81d2a330852fa5dfab29fba752b" FOREIGN KEY ("playerId") REFERENCES "player"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "player" ADD CONSTRAINT "FK_4d337145ef77879eec57d210549" FOREIGN KEY ("careerStatsId") REFERENCES "career_stats"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "match" ADD CONSTRAINT "FK_64e4b0003b6e0a10d1e388e2641" FOREIGN KEY ("groupId") REFERENCES "group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "team_players_player" ADD CONSTRAINT "FK_03530e45522b82c6ae46d825dd1" FOREIGN KEY ("teamId") REFERENCES "team"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "team_players_player" ADD CONSTRAINT "FK_a5a5ca467eb43bf810ce32a119d" FOREIGN KEY ("playerId") REFERENCES "player"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "group_players_player" ADD CONSTRAINT "FK_a023341f8241f811d107f635baf" FOREIGN KEY ("groupId") REFERENCES "group"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "group_players_player" ADD CONSTRAINT "FK_7e397b5ee53b69aaa67a0387322" FOREIGN KEY ("playerId") REFERENCES "player"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "match_teams_team" ADD CONSTRAINT "FK_a25e231842e46b018441c84f001" FOREIGN KEY ("matchId") REFERENCES "match"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "match_teams_team" ADD CONSTRAINT "FK_1c65d0c6cf67a4c3a06f0fef42e" FOREIGN KEY ("teamId") REFERENCES "team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "match_teams_team" DROP CONSTRAINT "FK_1c65d0c6cf67a4c3a06f0fef42e"`);
        await queryRunner.query(`ALTER TABLE "match_teams_team" DROP CONSTRAINT "FK_a25e231842e46b018441c84f001"`);
        await queryRunner.query(`ALTER TABLE "group_players_player" DROP CONSTRAINT "FK_7e397b5ee53b69aaa67a0387322"`);
        await queryRunner.query(`ALTER TABLE "group_players_player" DROP CONSTRAINT "FK_a023341f8241f811d107f635baf"`);
        await queryRunner.query(`ALTER TABLE "team_players_player" DROP CONSTRAINT "FK_a5a5ca467eb43bf810ce32a119d"`);
        await queryRunner.query(`ALTER TABLE "team_players_player" DROP CONSTRAINT "FK_03530e45522b82c6ae46d825dd1"`);
        await queryRunner.query(`ALTER TABLE "match" DROP CONSTRAINT "FK_64e4b0003b6e0a10d1e388e2641"`);
        await queryRunner.query(`ALTER TABLE "player" DROP CONSTRAINT "FK_4d337145ef77879eec57d210549"`);
        await queryRunner.query(`ALTER TABLE "match_performance" DROP CONSTRAINT "FK_81d2a330852fa5dfab29fba752b"`);
        await queryRunner.query(`ALTER TABLE "match_performance" DROP CONSTRAINT "FK_e37640ba9a6702f03f5f7a2245f"`);
        await queryRunner.query(`ALTER TABLE "fielding_stats" DROP CONSTRAINT "FK_655bd35bf4537fe0f6215fa1ed7"`);
        await queryRunner.query(`ALTER TABLE "bowling_stats" DROP CONSTRAINT "FK_b6dd5a75560b42d5c83241604c2"`);
        await queryRunner.query(`ALTER TABLE "batting_stats" DROP CONSTRAINT "FK_41287ad678d6f429b9355b45afe"`);
        await queryRunner.query(`ALTER TABLE "team" DROP CONSTRAINT "FK_96d76e96e2b2b84a0e7e7305e5c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1c65d0c6cf67a4c3a06f0fef42"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a25e231842e46b018441c84f00"`);
        await queryRunner.query(`DROP TABLE "match_teams_team"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7e397b5ee53b69aaa67a038732"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a023341f8241f811d107f635ba"`);
        await queryRunner.query(`DROP TABLE "group_players_player"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a5a5ca467eb43bf810ce32a119"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_03530e45522b82c6ae46d825dd"`);
        await queryRunner.query(`DROP TABLE "team_players_player"`);
        await queryRunner.query(`DROP TABLE "match"`);
        await queryRunner.query(`DROP TABLE "group"`);
        await queryRunner.query(`DROP TABLE "player"`);
        await queryRunner.query(`DROP TABLE "match_performance"`);
        await queryRunner.query(`DROP TABLE "career_stats"`);
        await queryRunner.query(`DROP TABLE "fielding_stats"`);
        await queryRunner.query(`DROP TABLE "bowling_stats"`);
        await queryRunner.query(`DROP TABLE "batting_stats"`);
        await queryRunner.query(`DROP TABLE "team"`);
    }

}
