import { KoordinatesDataset } from "@zhiweiliu/koordinates-base";
import { policeNzDatasets } from "../src/index";
import apiKey from "./api-key";

const TIMEOUT: number = 60000;
const datasetName = "NZ Police Station Boundaries 29 April 2021";

test.skip(
  "NZ addresses capabilites endpoint (THIS IS NOT YET IMPLEMENTED BY THE NZ POLICE)",
  async () => {
    let ds: KoordinatesDataset = policeNzDatasets.find(
      (d) => d.getName() === datasetName
    ) as KoordinatesDataset;
    expect(ds).not.toBe(undefined);

    let json = await ds.getLayerCapabilitiesJson(apiKey);
    expect(json["wfs:WFS_Capabilities"]["$"]["version"]).toBe("2.0.0");

    let xml = await ds.getLayerCapabilitiesXml(apiKey);
    expect(xml).toContain('wfs:WFS_Capabilities version="2.0.0"');

    xml = await ds.getAllCapabilitiesXml(apiKey);
    expect(xml).toContain("wfs:WFS_Capabilities");

    json = await ds.getAllCapabilitiesJson(apiKey);
    expect(json["wfs:WFS_Capabilities"]["$"]["version"]).toBe("2.0.0");

    // CS-W endpoint
    xml = await ds.getWebCatalogServicesXml();
    expect(xml).toContain("csw:Capabilities");
    json = await ds.getWebCatalogServicesJson();
    expect(json["csw:Capabilities"]).toBeDefined();
  },
  TIMEOUT
);

test.skip(
  "NZ addresses changesets endpoint (THIS IS NOT YET IMPLEMENTED BY THE NZ POLICE)",
  async () => {
    let ds: KoordinatesDataset = policeNzDatasets.find(
      (d) => d.getName() === datasetName
    ) as KoordinatesDataset;
    expect(ds).not.toBe(undefined);

    let changesets = await ds.getWfsChangesets(
      apiKey,
      "2023-01-01T00:00:00Z",
      "2023-01-15T00:00:00Z"
    );
    expect(changesets.type).toBe("FeatureCollection");
    expect(changesets.features.length).toBe(changesets.numberReturned);
  },
  TIMEOUT
);

test.skip(
  "NZ addresses spatial data query endpoints (THIS IS NOT YET IMPLEMENTED BY THE NZ POLICE)",
  async () => {
    let ds: KoordinatesDataset = policeNzDatasets.find(
      (d) => d.getName() === datasetName
    ) as KoordinatesDataset;
    expect(ds).not.toBe(undefined);

    let spatialDataJson = await ds.queryWfsSpatialApiJson(
      apiKey,
      -37.78828,
      175.28011,
      100,
      10000
    );
    expect(
      spatialDataJson["vectorQuery"]["layers"][`${ds.getLayerId()}`]
    ).toBeDefined();

    let spatialDataXml = await ds.queryWfsSpatialApiXml(
      apiKey,
      -37.78828,
      175.28011,
      100,
      10000
    );
    expect(spatialDataXml).toContain("kx:vectorQuery");
    expect(spatialDataXml).toContain("gml:featureMember");
  },
  TIMEOUT
);

test(
  "NZ addresses initial dataset",
  async () => {
    let nza: KoordinatesDataset = policeNzDatasets.find(
      (d) => d.getName() === datasetName
    ) as KoordinatesDataset;
    expect(nza).not.toBe(undefined);

    let actualCount = await nza.getInitialDatasetCount();
    console.log(`Initial dataset for ${nza.getName()} is ${actualCount}`);
    const batchSize = 100000;
    let start = 0;
    let count = 0;
    while (start < actualCount) {
      let dataset = await nza.getInitialDatasetInBatch(start, batchSize);
      count += dataset.length;
      start += dataset.length;
      console.log(`Loaded ${count} out of ${actualCount} records!`);
    }
    expect(actualCount).toBe(count);
  },
  TIMEOUT * 5
);
