const mongoose=require('mongoose');
// const mongoURI='mongodb://0.0.0.0:27017/inotebook'
const mongoURI='mongodb+srv://prasunbairagi:Jyotsona%40123@inotebook.vqp9y4p.mongodb.net/Notebookdata'

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
    }
};
module.exports=connectToMongo
