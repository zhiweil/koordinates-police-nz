import { APIKind, KoordinatesDataset } from "@zhiweiliu/koordinates-base";
export let nzpHost: string = "https://nzp.koordinates.com";
export let initialDatasetLocation: string =
  "https://s3.ap-southeast-2.amazonaws.com/nz-police-datasets.zhiweiliu.com";

export let policeNzDatasets = [
  new KoordinatesDataset({
    koordinatesHost: nzpHost,
    name: "NZ Police Station Boundaries 29 April 2021",
    layerId: 105482,
    apiKind: APIKind.WFS,
    apiVersion: "v1",
    version: "v2.0.0",
    initialDatasetTs: "2021-05-13T00:00:00Z",
    initialDatasetLocation,
    initialDataset: "nz-police-station-boundaries-29-april-2021.csv",
    hasSpatialInformation: true,
  }),
  new KoordinatesDataset({
    koordinatesHost: nzpHost,
    name: "NZ Police District Boundaries 29 April 2021",
    layerId: 105480,
    apiKind: APIKind.WFS,
    apiVersion: "v1",
    version: "v2.0.0",
    initialDatasetTs: "2021-05-13T00:00:00Z",
    initialDatasetLocation,
    initialDataset: "nz-police-district-boundaries-29-april-2021.csv",
    hasSpatialInformation: true,
  }),
  new KoordinatesDataset({
    koordinatesHost: nzpHost,
    name: "NZ Police Area Boundaries 29 April 2021",
    layerId: 105481,
    apiKind: APIKind.WFS,
    apiVersion: "v1",
    version: "v2.0.0",
    initialDatasetTs: "2021-05-13T00:00:00Z",
    initialDatasetLocation,
    initialDataset: "nz-police-area-boundaries-29-april-2021.csv",
    hasSpatialInformation: true,
  }),
];
