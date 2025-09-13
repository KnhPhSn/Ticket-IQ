import { Card, CardContent, Skeleton } from '@mui/material';

const UserCardSkeleton = () => {
  return (
    <Card className="mb-4">
      <CardContent>
        <div className="space-y-3">
          {/* Email skeleton */}
          <Skeleton variant="text" width="60%" height={20} />

          {/* Role skeleton */}
          <div className="flex items-center gap-2">
            <Skeleton variant="text" width="30%" height={20} />
            <Skeleton variant="rounded" width={80} height={24} />
          </div>

          {/* Skills section skeleton */}
          <div>
            <Skeleton variant="text" width="20%" height={20} className="mb-2" />
            <div className="flex flex-wrap gap-1">
              <Skeleton variant="rounded" width={70} height={24} />
              <Skeleton variant="rounded" width={90} height={24} />
              <Skeleton variant="rounded" width={60} height={24} />
            </div>
          </div>

          {/* Edit button skeleton */}
          <Skeleton variant="rounded" width={60} height={32} className="mt-3" />
        </div>
      </CardContent>
    </Card>
  );
};

export default UserCardSkeleton;
