import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FightersModule } from './fighters/fighters.module';
import { EventsModule } from './events/events.module';
import { FightsModule } from './fights/fights.module';
import { RankingsModule } from './rankings/rankings.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { GraphQLJSONObject } from 'graphql-type-json';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: false,
    }),

    GraphQLModule.forRoot({
      driver: ApolloDriver, 
      autoSchemaFile: 'schema.gql',
      sortSchema: true,
      resolvers: {                       
        JSONObject: GraphQLJSONObject,          
      },

    }),

    FightersModule,
    EventsModule,
    FightsModule,
    RankingsModule,
  ],
})
export class AppModule {}
