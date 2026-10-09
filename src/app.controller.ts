import { Controller, Get, Render, Query, Post, Body } from '@nestjs/common';
import { AppService } from './app.service.js';
import { catchError } from 'rxjs';
import { CreateProductDto } from './CreateProductDto.dto.js';

interface Product  {
  name: string;
  category: string;
  price: number;
  stock: number;
}


@Controller()
export class AppController {
   termekek: Product[]=[
  {
    "name": "Vezeték nélküli egér",
    "category": "elektronika",
    "price": 8990,
    "stock": 12
  },
  {
    "name": "Programozás kezdőknek",
    "category": "könyv",
    "price": 6490,
    "stock": 4
  },
  {
    "name": "Mechanikus billentyűzet",
    "category": "elektronika",
    "price": 24990,
    "stock": 3
  },
  {
    "name": "Fekete kapucnis pulóver",
    "category": "ruházat",
    "price": 12990,
    "stock": 8
  },
  {
    "name": "Catan társasjáték",
    "category": "játék",
    "price": 11990,
    "stock": 0
  },
  {
    "name": "USB-C töltőkábel",
    "category": "elektronika",
    "price": 4990,
    "stock": 25
  },
  {
    "name": "Adidas sportcipő",
    "category": "ruházat",
    "price": 27990,
    "stock": 2
  },
  {
    "name": "A kis herceg",
    "category": "könyv",
    "price": 3990,
    "stock": 15
  },
  {
    "name": "LEGO City rendőrségi állomás",
    "category": "játék",
    "price": 34990,
    "stock": 5
  },
  {
    "name": "Bluetooth hangszóró",
    "category": "elektronika",
    "price": 15990,
    "stock": 7
  }
  ];




  constructor(private readonly appService: AppService) {}

  @Get('')
  @Render('index')
  termeklista() {
    return {
      Product: this.termekek.sort((a,b)=>a.price - b.price)
    }
  }
  
  @Get("filter")
  @Render('filter')
  szures(@Query('category') category : string) {
    return {
      category: this.termekek
      .sort((a,b)=>b.stock - a.stock)
      .filter(a => !category || a.category === category),
    }
  }


  @Get("new")
  @Render('new')
  newDataForm() {
    return {sikeres : false}
  }

  @Post('new')
  @Render('new')
  newData(@Body() body : CreateProductDto){
    const newProduct: Product = {
      name: body.name,
      category: body.category,
      price: body.price,
      stock: body.stock
    };

    this.termekek.push(newProduct)

    return {sikeres: true}
    }
  }
