"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { ApiError, createProperty } from "@/lib/api";
import {
  PROPERTY_AMENITIES,
  PROPERTY_CITIES,
  propertySchema,
  type PropertyFormValues,
} from "@/lib/validations";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/Button";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

const inputClass =
  "w-full rounded-lg border border-navy/15 bg-white px-3 py-2 text-sm text-charcoal focus:border-amber focus:outline-none focus:ring-2 focus:ring-amber/30";
const labelClass = "mb-1 block text-sm font-medium text-charcoal";
const errorClass = "mt-1 text-xs text-red-600";
const sectionClass =
  "space-y-4 rounded-xl border border-navy/10 bg-white p-5 shadow-sm";

function ImagePreview({ url }: { url?: string }) {
  const [ok, setOk] = useState(false);
  const [failed, setFailed] = useState(false);
  const trimmed = url?.trim() ?? "";
  const valid =
    trimmed.startsWith("http://") || trimmed.startsWith("https://");

  useEffect(() => {
    setOk(false);
    setFailed(false);
  }, [trimmed]);

  if (!valid || failed) return null;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={trimmed}
      alt="Preview"
      onLoad={() => setOk(true)}
      onError={() => setFailed(true)}
      className={`mt-2 h-28 w-full rounded-lg object-cover ${ok ? "block" : "hidden"}`}
    />
  );
}

export function AddPropertyForm() {
  const router = useRouter();
  const { user, token } = useAuth();
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<PropertyFormValues>({
    resolver: zodResolver(propertySchema) as Resolver<PropertyFormValues>,
    defaultValues: {
      title: "",
      shortDescription: "",
      fullDescription: "",
      propertyType: "apartment",
      priceType: "sale",
      rentPeriod: undefined,
      price: Number.NaN,
      bedrooms: 0,
      bathrooms: 1,
      area: Number.NaN,
      address: "",
      areaName: "",
      city: "Dhaka",
      cityOther: "",
      country: "Bangladesh",
      image1: "",
      image2: "",
      image3: "",
      amenities: [],
      furnished: false,
      petFriendly: false,
      elevator: false,
      balcony: false,
      agentName: "",
      agentPhone: "",
      agentEmail: "",
    },
  });

  useEffect(() => {
    if (!user) return;
    setValue("agentName", user.name);
    setValue("agentEmail", user.email);
  }, [user, setValue]);

  const priceType = watch("priceType");
  const city = watch("city");
  const shortDescription = watch("shortDescription") ?? "";
  const fullDescription = watch("fullDescription") ?? "";
  const image1 = watch("image1");
  const image2 = watch("image2");
  const image3 = watch("image3");

  useEffect(() => {
    if (priceType === "sale") {
      setValue("rentPeriod", undefined);
    }
  }, [priceType, setValue]);

  const onSubmit = async (values: PropertyFormValues) => {
    if (!token) {
      toast.error("Please sign in again");
      return;
    }
    setSubmitting(true);
    try {
      const images = [values.image1, values.image2, values.image3]
        .map((u) => (u ?? "").trim())
        .filter(Boolean);

      await createProperty(token, {
        title: values.title.trim(),
        shortDescription: values.shortDescription.trim(),
        fullDescription: values.fullDescription.trim(),
        price: values.price,
        priceType: values.priceType,
        rentPeriod:
          values.priceType === "rent" ? values.rentPeriod ?? null : null,
        propertyType: values.propertyType,
        bedrooms: values.bedrooms,
        bathrooms: values.bathrooms,
        area: values.area,
        location: {
          address: values.address.trim(),
          area: values.areaName.trim(),
          city:
            values.city === "Other"
              ? (values.cityOther ?? "").trim()
              : values.city,
          country: values.country.trim() || "Bangladesh",
        },
        images,
        amenities: values.amenities,
        features: {
          furnished: values.furnished,
          petFriendly: values.petFriendly,
          elevator: values.elevator,
          balcony: values.balcony,
        },
        contactInfo: {
          agentName: values.agentName.trim(),
          agentPhone: values.agentPhone.trim(),
          agentEmail: values.agentEmail.trim(),
        },
      });

      toast.success("Your property has been listed!");
      router.push("/items/manage");
    } catch (err) {
      const message =
        err instanceof ApiError
          ? err.message
          : "Something went wrong. Please try again.";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
      aria-busy={submitting}
      noValidate
    >
      {/* Section 1 */}
      <section className={sectionClass}>
        <h2 className="font-display text-xl font-semibold text-navy">
          Basic Information
        </h2>
        <div>
          <label className={labelClass} htmlFor="title">
            Property Title
          </label>
          <input id="title" className={inputClass} {...register("title")} />
          {errors.title ? (
            <p className={errorClass}>{errors.title.message}</p>
          ) : null}
        </div>
        <div>
          <label className={labelClass} htmlFor="shortDescription">
            Short Description
          </label>
          <textarea
            id="shortDescription"
            rows={2}
            maxLength={150}
            className={inputClass}
            {...register("shortDescription")}
          />
          <p className="mt-1 text-xs text-cool-gray">
            {shortDescription.length}/150
          </p>
          {errors.shortDescription ? (
            <p className={errorClass}>{errors.shortDescription.message}</p>
          ) : null}
        </div>
        <div>
          <label className={labelClass} htmlFor="fullDescription">
            Full Description
          </label>
          <textarea
            id="fullDescription"
            rows={6}
            className={inputClass}
            {...register("fullDescription")}
          />
          <p className="mt-1 text-xs text-cool-gray">
            {fullDescription.length} characters (min 100)
          </p>
          {errors.fullDescription ? (
            <p className={errorClass}>{errors.fullDescription.message}</p>
          ) : null}
        </div>
      </section>

      {/* Section 2 */}
      <section className={sectionClass}>
        <h2 className="font-display text-xl font-semibold text-navy">
          Property Details
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="propertyType">
              Property Type
            </label>
            <select
              id="propertyType"
              className={inputClass}
              {...register("propertyType")}
            >
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="villa">Villa</option>
              <option value="office">Office</option>
              <option value="studio">Studio</option>
              <option value="land">Land</option>
            </select>
          </div>
          <div>
            <span className={labelClass}>Listing Type</span>
            <div className="mt-1 flex gap-4 text-sm">
              <label className="inline-flex items-center gap-2">
                <input type="radio" value="sale" {...register("priceType")} />
                For Sale
              </label>
              <label className="inline-flex items-center gap-2">
                <input type="radio" value="rent" {...register("priceType")} />
                For Rent
              </label>
            </div>
          </div>
        </div>

        {priceType === "rent" ? (
          <div>
            <span className={labelClass}>Rent Period</span>
            <div className="mt-1 flex gap-4 text-sm">
              <label className="inline-flex items-center gap-2">
                <input
                  type="radio"
                  value="monthly"
                  {...register("rentPeriod")}
                />
                Monthly
              </label>
              <label className="inline-flex items-center gap-2">
                <input
                  type="radio"
                  value="yearly"
                  {...register("rentPeriod")}
                />
                Yearly
              </label>
            </div>
            {errors.rentPeriod ? (
              <p className={errorClass}>{errors.rentPeriod.message}</p>
            ) : null}
          </div>
        ) : null}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <label className={labelClass} htmlFor="price">
              Price (BDT)
            </label>
            <input
              id="price"
              type="number"
              min={0}
              className={inputClass}
              {...register("price", { valueAsNumber: true })}
            />
            {errors.price ? (
              <p className={errorClass}>{errors.price.message}</p>
            ) : null}
          </div>
          <div>
            <label className={labelClass} htmlFor="bedrooms">
              Bedrooms
            </label>
            <input
              id="bedrooms"
              type="number"
              min={0}
              className={inputClass}
              {...register("bedrooms", { valueAsNumber: true })}
            />
            {errors.bedrooms ? (
              <p className={errorClass}>{errors.bedrooms.message}</p>
            ) : null}
          </div>
          <div>
            <label className={labelClass} htmlFor="bathrooms">
              Bathrooms
            </label>
            <input
              id="bathrooms"
              type="number"
              min={0}
              className={inputClass}
              {...register("bathrooms", { valueAsNumber: true })}
            />
            {errors.bathrooms ? (
              <p className={errorClass}>{errors.bathrooms.message}</p>
            ) : null}
          </div>
          <div>
            <label className={labelClass} htmlFor="area">
              Area (sqft)
            </label>
            <input
              id="area"
              type="number"
              min={0}
              className={inputClass}
              {...register("area", { valueAsNumber: true })}
            />
            {errors.area ? (
              <p className={errorClass}>{errors.area.message}</p>
            ) : null}
          </div>
        </div>

        <div>
          <span className={labelClass}>Key Features</span>
          <div className="mt-2 grid grid-cols-2 gap-2 text-sm sm:grid-cols-4">
            {(
              [
                ["furnished", "Furnished"],
                ["petFriendly", "Pet Friendly"],
                ["elevator", "Elevator"],
                ["balcony", "Balcony"],
              ] as const
            ).map(([name, label]) => (
              <label key={name} className="inline-flex items-center gap-2">
                <input type="checkbox" {...register(name)} />
                {label}
              </label>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3 */}
      <section className={sectionClass}>
        <h2 className="font-display text-xl font-semibold text-navy">
          Location
        </h2>
        <div>
          <label className={labelClass} htmlFor="address">
            Street Address
          </label>
          <input id="address" className={inputClass} {...register("address")} />
          {errors.address ? (
            <p className={errorClass}>{errors.address.message}</p>
          ) : null}
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="areaName">
              Area / Neighbourhood
            </label>
            <input
              id="areaName"
              className={inputClass}
              {...register("areaName")}
            />
            {errors.areaName ? (
              <p className={errorClass}>{errors.areaName.message}</p>
            ) : null}
          </div>
          <div>
            <label className={labelClass} htmlFor="city">
              City
            </label>
            <select id="city" className={inputClass} {...register("city")}>
              {PROPERTY_CITIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>
        {city === "Other" ? (
          <div>
            <label className={labelClass} htmlFor="cityOther">
              City name
            </label>
            <input
              id="cityOther"
              className={inputClass}
              {...register("cityOther")}
            />
            {errors.cityOther ? (
              <p className={errorClass}>{errors.cityOther.message}</p>
            ) : null}
          </div>
        ) : null}
        <div>
          <label className={labelClass} htmlFor="country">
            Country
          </label>
          <input
            id="country"
            className={`${inputClass} bg-off-white`}
            readOnly
            {...register("country")}
          />
        </div>
      </section>

      {/* Section 4 */}
      <section className={sectionClass}>
        <h2 className="font-display text-xl font-semibold text-navy">Images</h2>
        <p className="text-xs text-cool-gray">
          Use Imgbb or Cloudinary to upload images and paste the URL here.
        </p>
        {(
          [
            ["image1", "Image URL 1 (required)", image1, true],
            ["image2", "Image URL 2 (optional)", image2, false],
            ["image3", "Image URL 3 (optional)", image3, false],
          ] as const
        ).map(([name, label, value]) => (
          <div key={name}>
            <label className={labelClass} htmlFor={name}>
              {label}
            </label>
            <input id={name} className={inputClass} {...register(name)} />
            {errors[name] ? (
              <p className={errorClass}>{errors[name]?.message}</p>
            ) : null}
            <ImagePreview url={value} />
          </div>
        ))}
      </section>

      {/* Section 5 */}
      <section className={sectionClass}>
        <h2 className="font-display text-xl font-semibold text-navy">
          Amenities
        </h2>
        <Controller
          control={control}
          name="amenities"
          render={({ field }) => (
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {PROPERTY_AMENITIES.map((item) => {
                const selected = field.value ?? [];
                const checked = selected.includes(item);
                return (
                  <label
                    key={item}
                    className="inline-flex items-center gap-2 text-sm text-charcoal"
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => {
                        field.onChange(
                          checked
                            ? selected.filter((a) => a !== item)
                            : [...selected, item]
                        );
                      }}
                    />
                    {item}
                  </label>
                );
              })}
            </div>
          )}
        />
      </section>

      {/* Section 6 */}
      <section className={sectionClass}>
        <h2 className="font-display text-xl font-semibold text-navy">
          Agent Contact Info
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className={labelClass} htmlFor="agentName">
              Agent Name
            </label>
            <input
              id="agentName"
              className={inputClass}
              {...register("agentName")}
            />
            {errors.agentName ? (
              <p className={errorClass}>{errors.agentName.message}</p>
            ) : null}
          </div>
          <div>
            <label className={labelClass} htmlFor="agentPhone">
              Agent Phone
            </label>
            <input
              id="agentPhone"
              className={inputClass}
              placeholder="+880 1XXX-XXXXXX"
              {...register("agentPhone")}
            />
            {errors.agentPhone ? (
              <p className={errorClass}>{errors.agentPhone.message}</p>
            ) : null}
          </div>
          <div>
            <label className={labelClass} htmlFor="agentEmail">
              Agent Email
            </label>
            <input
              id="agentEmail"
              type="email"
              className={inputClass}
              {...register("agentEmail")}
            />
            {errors.agentEmail ? (
              <p className={errorClass}>{errors.agentEmail.message}</p>
            ) : null}
          </div>
        </div>
      </section>

      <Button type="submit" className="w-full" size="lg" disabled={submitting}>
        {submitting ? (
          <>
            <LoadingSpinner className="h-4 w-4" />
            Submitting…
          </>
        ) : (
          "Submit Listing"
        )}
      </Button>
    </form>
  );
}
