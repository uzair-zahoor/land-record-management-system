import { gql } from '@apollo/client';

export const GET_LANDOWNERS = gql`
  query GetLandowners($mouzaId: ID, $search: String) {
    landowners(mouzaId: $mouzaId, search: $search) {
      id
      name
      urduName
      cnic
      fatherOrHusbandName
      contactNumber
      mouzaName
      associatedKhewatNumbers
      status
    }
  }
`;

export const GET_LAND_PARCELS = gql`
  query GetLandParcels($mouzaId: ID) {
    landParcels(mouzaId: $mouzaId) {
      id
      khasraNumber
      mouzaName
      khewatNumber
      khatauniNumber
      landType
      status
      area {
        kanals
        marlas
        formatted
      }
    }
  }
`;

export const GET_MUTATIONS = gql`
  query GetMutations($status: String) {
    mutations(status: $status) {
      id
      mutationNumber
      mutationType
      applicantName
      mouzaName
      khewatNumber
      currentStatus
      currentStepIndex
      applicationDate
    }
  }
`;

export const GET_FARD_BY_REFERENCE = gql`
  query GetFardByReference($referenceNumber: String!) {
    fard(referenceNumber: $referenceNumber) {
      id
      referenceNumber
      barcodeNumber
      issueDate
      owner {
        name
        urduName
        cnic
      }
      khewatNumber
      khatauniNumber
      status
    }
  }
`;
