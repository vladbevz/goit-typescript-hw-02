interface LoadMoreBtnProps {
    onClick: () => void;
  }
  
  export default function LoadMoreBtn({ onClick }: LoadMoreBtnProps) {
    return (
      <button onClick={onClick}>Load more</button>
    );
  }
  