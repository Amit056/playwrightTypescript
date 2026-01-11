import fs from 'fs';
import path from 'path';
import { TestInfo } from '@playwright/test';

export class TestDataManager {
  private static baseDir = path.join(process.cwd(), 'runtime-data');
  static cache: any;

  // ---------- internal helpers ----------
  private static ensureDir() {
    if (!fs.existsSync(this.baseDir)) {
      fs.mkdirSync(this.baseDir);
    }
  }

  private static file(testInfo: TestInfo) {
    return path.join(
      this.baseDir,
      `worker-${testInfo.workerIndex}.json`
    );
  }

  // ---------- public API ----------
  static init() {
    this.ensureDir();
  }

  static set(testInfo: TestInfo, key: string, value: any) {
    this.ensureDir();
    const file = this.file(testInfo);

    const data = fs.existsSync(file)
      ? JSON.parse(fs.readFileSync(file, 'utf-8'))
      : {};

    data[key] = value;
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
  }

  static get<T = any>(testInfo: TestInfo, key: string): T {
    const file = this.file(testInfo);

    if (!fs.existsSync(file)) {
      throw new Error(`No test data file for worker ${testInfo.workerIndex}`);
    }

    const data = JSON.parse(fs.readFileSync(file, 'utf-8'));
    return data[key];
  }

  static cleanup() {
    if (fs.existsSync(this.baseDir)) {
      fs.rmSync(this.baseDir, { recursive: true, force: true });
    }
  }
  static cleanWorker(testInfo: TestInfo) {
  const file = this.file(testInfo);

  if (fs.existsSync(file)) {
    fs.unlinkSync(file);
    console.log(`🧹 Cleaned worker data: ${file}`);
  }

  this.cache?.delete?.(testInfo.workerIndex);
}
}
