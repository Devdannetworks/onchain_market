export interface eventProps {
  id: number;
  image: string;
  title: string;
  candidates: candidates_details[];
  volume: number;
}

export interface candidates_details {
  candidate_name: string;
  percentage_vote: number;
}
