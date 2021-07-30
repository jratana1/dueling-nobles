import { DateTime } from "luxon"

function ElapsedTime({ value }) {
  const diff = DateTime.now().diff(DateTime.fromISO(value), ['days', 'hours', 'minutes', 'seconds']).toObject()
  

    if (diff.days !== 0) {
        return <>{`${diff.days} days ago`}</>;
    }
    else if (diff.hours !== 0 ) {
        return <>{`${diff.hours} hours ago`}</>;
    }
    else if (diff.minutes !==0 ) {
        return <>{`${diff.minutes} minutes ago`}</>;
    }
    else {
        return <>{`a few seconds ago`}</>;
  }
}

export default ElapsedTime;