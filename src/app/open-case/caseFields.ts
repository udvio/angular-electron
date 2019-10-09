export interface Fields {
    fieldDisplay: string,
    priority: number,
    fieldIdentifier: string,
    fieldType: string
}

export interface ICaseFields {
    caseType: string;
    fields: Fields[]
}

// export const CaseTypes = {
//     "Accident":[
//       {
//         fieldDisplay: "Name",
//         priority: 1,
//         fieldIdentifier: "clientName",
//         fieldType: "string"
//       },
//       {
//         fieldDisplay: "Identity Card #",
//         priority: 2,
//         fieldIdentifier: "accidentDate",
//         fieldType: "string"
//       },
//       {
//         fieldDisplay: "License Plate #",
//         priority: 4,
//         fieldIdentifier: "licensePlateNumber",
//         fieldType: "string"
//       },
//       {
//         fieldDisplay: "Accident Date",
//         priority: 3,
//         fieldIdentifier: "accidentDate",
//         fieldType: "date"
//       }],
    
//     "Dummy": [
//       {
//         fieldDisplay: "Dummy 1",
//         priority: 1,
//         fieldIdentifier: "dummy1",
//         fieldType: "string"
//       },
//       {
//         fieldDisplay: "Dummy 2",
//         priority: 2,
//         fieldIdentifier: "dummy2",
//         fieldType: "date"
//       },
//       {
//         fieldDisplay: "Dummy 3",
//         priority: 3,
//         fieldIdentifier: "dummy3",
//         fieldType: "string"
//       }
//     ]
//   }

export const CaseTypeKeys = [
  'Accident',
  'Dummy'
]