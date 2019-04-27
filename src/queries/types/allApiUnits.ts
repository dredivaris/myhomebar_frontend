/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: allApiUnits
// ====================================================

export interface allApiUnits_allApiUnits_nodes {
  __typename: "ApiUnit";
  name: string;
  id: number;
  /**
   * A globally unique identifier. Can be used in various places throughout the system to identify this single value.
   */
  nodeId: string;
}

export interface allApiUnits_allApiUnits {
  __typename: "ApiUnitsConnection";
  /**
   * A list of `ApiUnit` objects.
   */
  nodes: (allApiUnits_allApiUnits_nodes | null)[];
}

export interface allApiUnits {
  /**
   * Reads and enables pagination through a set of `ApiUnit`.
   */
  allApiUnits: allApiUnits_allApiUnits | null;
}
