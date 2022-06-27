import { ObjectId } from "mongoose";

//DateScalar
import { DateScalar } from "src/date.scaler";

interface Contact {
    address: string;
    country: string;
    city: string;
    zip: string;
}

interface Avatar {
    url: string;
    id: string;
}

interface Provider {
    name: string;
    id: string;
}

export interface ReqUser {
    _id: ObjectId;
    name: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    verified: boolean;
    contact: Contact;
    provider: Provider;
    avatar: Avatar;
    role: string;
    createdAt: DateScalar;
    updatedAt: DateScalar;
}