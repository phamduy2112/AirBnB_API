import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles'; // Chìa khóa metadata để tránh xung đột
export const Role = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);