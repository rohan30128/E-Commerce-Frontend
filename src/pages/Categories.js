import React from "react";
import Layout from "../components/Layout/Layout";
import useCategory from "../hooks/useCategory";
import { Link } from "react-router-dom";

export default function Categories() {
  const categories = useCategory();

  return (
    <Layout title="All Categories">
      <div className="container" style={{ marginTop: "100px" }}>
        <div className="row container">
          {categories?.map((c) => {
            return (
              <div className="col-md-4 mt-5 mb-3 gx-3 gy-3" key={c._id}>
                <div className="card">
                <Link
                  to={`/category/${c.slug}`}
                  className="btn btn-primary cat-btn"
                >
                  {c.name}
                </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
