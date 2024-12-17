import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class ItemsService {
  private items = [];
  private idCounter = 1;

  create(createItemDto: CreateItemDto) {
    const newItem = { id: this.idCounter++, ...createItemDto };
    this.items.push(newItem);
    return newItem;
  }

  findAll() {
    return this.items;
  }

  findOne(id: number) {
    return this.items.find(item => item.id === id);
  }

  update(id: number, updateItemDto: UpdateItemDto) {
    const itemIndex = this.items.findIndex(item => item.id === id);
    if (itemIndex === -1) return { error: 'Item not found' };

    this.items[itemIndex] = { ...this.items[itemIndex], ...updateItemDto };
    return this.items[itemIndex];
  }

  remove(id: number) {
    const itemIndex = this.items.findIndex(item => item.id === id);
    if (itemIndex === -1) return { error: 'Item not found' };

    const deletedItem = this.items.splice(itemIndex, 1);
    return deletedItem[0];
  }
}
