import { useForm, SubmitHandler } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import React, { useEffect } from "react";
import './SearchBar.css';

interface SearchFormValues {
  search: string;
}

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchFormValues>();

  const onSubmit: SubmitHandler<SearchFormValues> = (data) => {
    onSearch(data.search);
  };

  useEffect(() => {
    if (errors.search && errors.search.message) {
      toast.error(errors.search.message);
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
