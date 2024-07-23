import React from 'react';
import { Flex, Progress } from 'antd';
import { progressTowardsBenchMark } from './report/ReportFunctions';

// // Function to calculate progress towards benchmark
// export const progressTowardsBenchMark = (marks) => {
//   const progress = (marks / 244) * 100;
//   return progress.toFixed(2);
// };

export default function Test() {
  // Example marks value
  const marks = 243; // Replace this with your actual marks

  // Calculate the percentage
  const percentage = progressTowardsBenchMark(marks);

  return (
    <Flex gap="small" vertical>
      <Progress
        percent={percentage}
        percentPosition={{
          align: 'center',
          type: 'inner',
        }}
        size={[400, 20]}
      />
    </Flex>
  );
}
