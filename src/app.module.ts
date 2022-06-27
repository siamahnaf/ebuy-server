import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { MongooseModule } from "@nestjs/mongoose";
import { MailerModule } from "@nestjs-modules/mailer";
//Node path
import { join } from 'path';

//Using Apollo Studio
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';

//Modules
import { UserModule } from "./user/user.module";
import { CategoryModule } from "./category/category.module";

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      installSubscriptionHandlers: true,
      playground: false,
      path: "ebuy",
      context: ({ req }) => ({
        headers: req.headers
      }),
      plugins: [ApolloServerPluginLandingPageLocalDefault()]
    }),
    MailerModule.forRoot({
      transport: {
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "f1cca267d908ae",
          pass: "546752b1e1ad91"
        }
      }
    }),
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_LOCAL_URL),
    UserModule,
    CategoryModule
  ]
})
export class AppModule { }
