import {
  Card,
  CardContent,
  Skeleton,
} from '@mui/material';

const TicketSkeleton = () => {
  return (
    <Card>
      <CardContent className="space-y-4">
        {/* Title skeleton */}
        <Skeleton variant="text" width="60%" height={35} />

        {/* Description skeleton */}
        <div className="space-y-1">
          <Skeleton variant="text" width="100%" />
          <Skeleton variant="text" width="80%" />
        </div>

        <div className="space-y-3">
          {/* Status skeleton */}
          <Skeleton variant="text" width="30%" />

          {/* Priority skeleton */}
          <Skeleton variant="text" width="25%" />

          {/* Related Skills skeleton */}
          <div>
            <Skeleton variant="text" width="35%" className="mb-1" />
            <div className="flex flex-wrap gap-1">
              <Skeleton variant="rounded" width={80} height={24} />
              <Skeleton variant="rounded" width={100} height={24} />
              <Skeleton variant="rounded" width={90} height={24} />
            </div>
          </div>

          {/* Helpful Notes skeleton */}
          <div>
            <Skeleton variant="text" width="40%" className="mb-1" />
            <div className="space-y-1">
              <Skeleton variant="text" width="100%" />
              <Skeleton variant="text" width="85%" />
            </div>
          </div>

          {/* Assigned to skeleton */}
          <Skeleton variant="text" width="45%" />
        </div>

        {/* Created at skeleton */}
        <Skeleton variant="text" width="40%" className="pt-2" />
      </CardContent>
    </Card>
  );
};

export default TicketSkeleton;
