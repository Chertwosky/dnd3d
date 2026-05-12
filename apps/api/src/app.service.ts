import { Injectable } from '@nestjs/common';
@Injectable()
export class AppService {
  getHealth() {
    return {
      name: 'DnD 3D',
      status: 'ok' as const,
      timestamp: new Date().toISOString(),
    };
  }
}
