import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  /**
   * Create a new item
   * @example http POST :3000/items name="Item1" description="This is Item1"
   */
  @Post()
  create(@Body() createItemDto: CreateItemDto) {
    return this.itemsService.create(createItemDto);
  }

  /**
   * Read all items
   * @example http :3000/items
   */
  @Get()
  findAll() {
    return this.itemsService.findAll();
  }

  /**
   * Read a single item by ID
   * @example http :3000/items/1
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemsService.findOne(+id);
  }

  /**
   * Update an existing item by ID
   * @example http PUT :3000/items/1 name="Item1 - Updated"
   */
  @Put(':id')
  update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    return this.itemsService.update(+id, updateItemDto);
  }

  /**
   * Delete an item by ID
   * @example http DELETE :3000/items/1
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemsService.remove(+id);
  }
}
