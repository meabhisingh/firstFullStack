const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
              name:{
                  type:String,
                  required:[true,'Please enter the product name'],
                  trim:true,
                  maxLength:[100,'Product names cannot exceed 100 characters']
              },
              price:{
                  type:Number,
                  required:[true,'Please enter the product price'],
                  maxLength:[5,'Product price cannot exceed 5 characters'],
                  default:0.0
              },
               description:{
                type:String,
                required:[true,'Please enter the product description'],
            },
            rating:{
                type:Number,
                default:0
            },
            images:[{
                 public_id:{
                     type:String,
                     require:true,
                 },
                  url:{
                     type:String,
                     require:true,
                 },
            }],
            category:{
                type:String,
                required:[true,"Please select category for this product"],
                enum:{
                    values:['Electronic',
                    'Cameras',
                    'Laptops',
                    'Accessories',
                    'Headphones',
                    'Food',
                    'Books',
                    'Clothes/Shoes',
                    'Beauty/Health',
                    'Sports',
                    'Outdoor',
                    'Home']
                },
                message:"Please select correct category for product"
            },
            seller:{
                type:String,
                required:[true,"Please enter product seller"]
            },
            stock:{
                type:Number,
                required:[true,"Please Enter product stock"],
                maxLength:[5,"Product cannot exceed 5 characters"],
                default:0
            },
            numOfReviews:{
                    type:Number,
                    default:0
            },
            reviews:[
                { 

                    user:{ 
                        type: mongoose.Schema.ObjectId ,
                        ref:'User',
                        required:true
                    },
                    
                    name:{
                        type:String,
                        required:true
                    },
                    rating:{
                        type:Number,
                        required:true
                    },
                    comment:{
                        type:String,
                        required:true
                    }
                }
            ],

            user:{ 
                type: mongoose.Schema.ObjectId ,
                ref:'User',
                required:true

            },
            createdAt:{
                type:Date,
                default:Date.now
            }
})

module.exports=mongoose.model('Product',productSchema);
