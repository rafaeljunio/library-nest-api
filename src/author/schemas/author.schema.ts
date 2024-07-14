import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@Schema({
  timestamps: true,
})
export class Author {
  @Prop()
  name: string

  @Prop()
  biography: string

  @Prop()
  birthDate: Date
}

export const AuthorSchema = SchemaFactory.createForClass(Author)
