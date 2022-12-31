import { Cluster } from '../models/Cluster';
import * as _ from 'lodash';

function validateLLoydsParams(data: number[][], k: number): void {
  if (data === undefined || data === null) {
    throw new Error('data must be defined.');
  }
  if (data.length === 0) {
    throw new Error('data cannot be empty.');
  }
  if (!data.every((d) => d.length === data[0].length)) {
    throw new Error('all datapoints must have name number of dimensions.');
  }
  if (data[0].length === 0) {
    throw new Error('datapoints must have at least 1 dimension.');
  }
  if (!Number.isInteger(k)) {
    throw new Error('k must be an integer value.');
  }
  if (k <= 0) {
    throw new Error('k must be a positive integer.');
  }
  if (k > data.length) {
    throw new Error('k cannot be more than number of datapoints. ');
  }
}

function getRandomCentroids(data: number[][], k: number): number[][] {
  const uniquePoints: number[][] = _.uniqWith(data, _.isEqual);
  const centroids: number[][] = [];
  for (let i: number = 0; i < k; i++) {
    centroids.push(
      uniquePoints.splice(Math.random() * uniquePoints.length, 1)[0]
    );
  }
  return centroids;
}

function calcDistanceBetweenDatapoints(a: number[], b: number[]): number {
  return Math.sqrt(
    a.reduce((total, cur, idx) => {
      return total + Math.pow(cur - b[idx], 2);
    }, 0)
  );
}

function getClusters(centroids: number[][], data: number[][]): Cluster[] {
  const clusters: Cluster[] = centroids.map((c) => {
    return { centroid: c, data: [] };
  });
  data.forEach((d) => {
    const closestCluster: Cluster = clusters
      .map((c) => {
        return {
          cluster: c,
          dist: calcDistanceBetweenDatapoints(c.centroid, d),
        };
      })
      .reduce((prev, cur) => (prev.dist < cur.dist ? prev : cur)).cluster;
    closestCluster.data.push(d);
  });
  clusters.forEach((c) => {
    c.centroid = c.centroid.map((_, idx) => {
      return (
        c.data.map((datapoint) => datapoint[idx]).reduce((p, c) => p + c) /
        c.data.length
      );
    });
  });
  return clusters;
}

export function lloyds(data: number[][], k: number): Cluster[] {
  validateLLoydsParams(data, k);
  const centroids: number[][] = getRandomCentroids(data, k);
  let clusters: Cluster[] = getClusters(centroids, data);
  let recalculatedClusters: Cluster[] = getClusters(
    clusters.map((c) => c.centroid),
    data
  );
  while (!_.isEqual(clusters, recalculatedClusters)) {
    clusters = recalculatedClusters;
    recalculatedClusters = getClusters(
      clusters.map((c) => c.centroid),
      data
    );
  }
  return recalculatedClusters;
}
