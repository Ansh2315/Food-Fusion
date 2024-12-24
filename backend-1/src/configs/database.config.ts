import { connect, ConnectOptions } from 'mongoose';

export const dbConnect = () => {
    connect(process.env.MONGO_URI!, {
    } as ConnectOptions).then(
        () => console.log("DB connect successfully"),
        (error) => console.log(error)
    )
}