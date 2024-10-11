import { useForm, SubmitHandler } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import './SearchBar.css'


interface SearchBarProps {
  onSearch: (query: string) => void;
}


interface FormData {
  search: string;
}

export default function SearchBar({ onSearch }: SearchBarProps) {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  
  const onSubmit: SubmitHandler<FormData> = (data) => {
    onSearch(data.search);
  };

  
  useEffect(() => {
    if (errors.search) {
      toast.error(errors.search.message || "Error occurred");
    }
  }, [errors]);

  return (
    <>
      <header className="header">
        <Toaster />
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            {...register("search", { required: "This field is required" })}
          />
          <button type="submit">Search</button>
        </form>
      </header>
    </>
  );
}
