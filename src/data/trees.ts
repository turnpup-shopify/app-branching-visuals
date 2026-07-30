import type { TreeDef } from "../types";
import ikigaiData from "./ikigai.json";
import visionLayersData from "./visionLayers.json";
import loveListData from "./loveList.json";

export const trees: TreeDef[] = [
  ikigaiData as unknown as TreeDef,
  visionLayersData as unknown as TreeDef,
  loveListData as unknown as TreeDef,
];
