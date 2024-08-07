import * as sdk from 'node-appwrite';

// export const {
//     PROJECT_ID, 
//     API_KEY, 
//     DATABASE_ID, 
//     PATIENT_COLLECTION_ID, 
//     DOCTOR_COLLECTION_ID, 
//     APPOINTMENT_COLLECTION_ID, 
//     NEXT_PUBLIC_BUCKET_ID: BUCKET_ID,
//     NEXT_PUBLIC_ENDPOINT: ENDPOINT
// } = process.env;

export const PROJECT_ID='66990e12003c7ab85faa'
export const API_KEY='ede97597c854e4fff45b0327cf9bd2a3acdee9b3d58e46a27738f9b11b591ca5e13d312b696579e805d0dad794afefdf562920e76500d0db34d90cbc840e15a08e42d1f2501a4fe7e19aad2093e3f1e65ac4c203b2b110385d76785a13aa6221b6a06eedd086d3ec6c0bc44f8972191db97153be644547ad2782d40f840cdbba'
export const DATABASE_ID='66990edc0006716c42d7'
export const PATIENT_COLLECTION_ID='66990efc002b2de16a01'
export const DOCTOR_COLLECTION_ID='66990f2b000498d6d545'
export const APPOINTMENT_COLLECTION_ID='66990f5c000e4f245e9c'
export const BUCKET_ID='66990f970016915aaa7f'
export const ENDPOINT='https://cloud.appwrite.io/v1'

const client = new sdk.Client();

client
.setEndpoint('https://cloud.appwrite.io/v1')
.setProject('66990e12003c7ab85faa')
.setKey('ede97597c854e4fff45b0327cf9bd2a3acdee9b3d58e46a27738f9b11b591ca5e13d312b696579e805d0dad794afefdf562920e76500d0db34d90cbc840e15a08e42d1f2501a4fe7e19aad2093e3f1e65ac4c203b2b110385d76785a13aa6221b6a06eedd086d3ec6c0bc44f8972191db97153be644547ad2782d40f840cdbba');

export const databases = new sdk.Databases(client);
export const storage = new sdk.Storage(client);
export const messaging = new sdk.Messaging(client);
export const users = new sdk.Users(client);