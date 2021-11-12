import { HttpException, Injectable } from '@nestjs/common';
import { Model, ObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Car } from './car';

@Injectable()
export class CarService {

    constructor(@InjectModel('Car') private readonly carModel: Model<Car>){}

    public async getCars():Promise<Car[]>{
        const cars = await this.carModel.find().exec();
        if(!cars || !cars[0]){
            throw new HttpException('Not Found',404);
        }
        return cars;
    }

    public async addCar(newcar:Car): Promise<Car>{
        const car = await new this.carModel(newcar);
        return car.save();
    }

    public async getCarById(id:number): Promise<Car>{
        const car = await this.carModel.findOne({id});
        if(!car){
            throw new HttpException('Not Found',404);
        }
        return car;
    }

    public async deleteCarById(id:number): Promise<Car[]>{
        const car = await this.carModel.deleteOne({id});
        if(car.deletedCount===0){
            throw new HttpException('Not Found',404);
        }
        const cars = await this.carModel.find().exec();
        return cars;
    }
 
    public async putCarById(id:number , propertyName:string , propertyValue:string):Promise<any>{
        const car = await this.carModel.findOneAndUpdate({id},{[propertyName]:propertyValue});
        if(!car){
            throw new HttpException('Not Found',404);
        }
        return 'updated'
    }
}
