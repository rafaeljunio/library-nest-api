import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose from 'mongoose'

@Schema({
  timestamps: true,
})
export class Book {
  @Prop()
  title: string

  @Prop()
  description: string

  @Prop()
  publicationDate: Date

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Author' })
  authorId: string
}

export const BookSchema = SchemaFactory.createForClass(Book)
