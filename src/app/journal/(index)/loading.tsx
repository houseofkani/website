import { JournalMasthead } from "@/components/JournalMasthead";
import { JournalListingSkeleton } from "@/components/JournalSkeletons";

export default function JournalLoading() {
  return (
    <>
      <JournalMasthead />
      <JournalListingSkeleton />
    </>
  );
}
