import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FilterUserInput {
    @Field({ nullable: true })
    id?: string;
    @Field({ nullable: true })
    firstname?: string;
    @Field({ nullable: true })
    lastname?: string;
}
