import { Card, CardContent, Skeleton } from '@mui/material';

const BriefTicketSkeleton = () => {
  return (
    <Card className="mb-4">
      <CardContent>
        {/* Title skeleton */}
        <Skeleton variant="text" width="70%" height={24} className="mb-1" />

        {/* Description skeleton */}
        <div className="mb-2">
          <Skeleton variant="text" width="100%" height={16} />
          <Skeleton variant="text" width="60%" height={16} />
        </div>

        {/* Created at skeleton */}
        <Skeleton variant="text" width="40%" height={14} />
      </CardContent>
    </Card>
  );
};

export default BriefTicketSkeleton;
