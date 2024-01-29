# Koordinates - New Zealand Police

<span style="color:red"> **NOTE: the APIs of layer capabilities, site capabilietes, spatial query and changesets are not yet implemented by New Zealand Police.**</span>

The repository provides access to LINZ datasets hosted by Koordinates. It is built on module [@zhiweiliu/koordiates-base](https://www.npmjs.com/package/@zhiweiliu/koordinates-base). Please refer to the base module for more details.

## Supported datasets

- NZ Police Station Boundaries 29 April 2021
- NZ Police District Boundaries 29 April 2021
- NZ Police Area Boundaries 29 April 2021

## Example

```typescript
// import Koordinates modules
import { KoordinatesDataset } from "@zhiweiliu/koordinates-base";
import { policeNzDatasets } from "@zhiweiliu/koordinates-police-nz";

// Koordinates API key, it is recommended to load it at run time instead of hard-coding it in a file
import apiKey from "./api-key";

// Find dataset
let ds: KoordinatesDataset = policeNzDatasets.find(
  (d) => d.getName() === "NZ Police Station Boundaries 29 April 2021"
) as KoordinatesDataset;

// Invoke methods on the dataset object
let json = await nza.getInitialDatasetInBatch(0, 100000);
console.log(json);
```
