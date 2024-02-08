"use server";
// Imports for supabase
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

/**
 * Gets the vehicles for the current user.
 * @returns An array of vehicle records.
 * @throws If there is an error getting the data.
 */
export async function getVehicles() {
  // Create a new Supabase client
  const cookiesStore = cookies();
  const supabase = createClient(cookiesStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  try {
    const { data: vehicles, error } = await supabase
      .from("vehicles")
      .select()
      .eq("user", user?.id);

    if (error) {
      throw new Error(`Error getting data: ${error.message}`);
    }

    return vehicles;
  } catch (e) {
    console.error("Error getting vehicles:", e);
    throw e;
  }
}

/**
 * Creates a new vehicle record.
 *
 * @param form - The form data containing the vehicle information.
 * @returns An object containing a success message and the created vehicle data.
 * @throws If there is an error uploading the image or inserting the data.
 */
export async function createVehicle(form: FormData) {
  // Create a new Supabase client
  const cookiesStore = cookies();
  const supabase = createClient(cookiesStore);
  try {
    const rawFormData: { [key: string]: FormDataEntryValue | File } =
      Object.fromEntries(form.entries());

    const { images }: { images?: File } = rawFormData;

    if (images && images.size > 0) {
      const { data, error } = await supabase.storage
        .from("images")
        .upload(images.name + Date.now(), images);

      if (error) {
        throw new Error(`Error uploading image: ${error.message}`);
      }
      const path = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/${data.path}`;
      rawFormData.images = path;
    }

    if (images?.size === 0) {
      delete rawFormData.images;
    }

    const { data: vehicle, error } = await supabase
      .from("vehicles")
      .insert([rawFormData])
      .select();

    if (error) {
      throw new Error(`Error inserting data: ${error.message}`);
    }

    return { msg: "Vehicle created successfully", data: vehicle };
  } catch (e) {
    console.error("Error creating vehicle:", e);
    throw e;
  }
}

/**
 * Updates a vehicle with the provided form data and ID.
 * If an image is included in the form data, it is uploaded to the Supabase storage and the image path is updated in the form data.
 * If the image size is 0, the image path is removed from the form data.
 * Finally, the updated form data is used to update the vehicle record in the Supabase database.
 * @param form - The form data containing the updated vehicle information.
 * @param id - The ID of the vehicle to be updated.
 * @returns An object containing a success message and the updated vehicle data.
 * @throws If there is an error uploading the image or updating the vehicle data.
 */
export async function updateVehicle(form: FormData, id: number | undefined) {
  // Create a new Supabase client
  const cookiesStore = cookies();
  const supabase = createClient(cookiesStore);
  try {
    const rawFormData: { [key: string]: FormDataEntryValue | File } =
      Object.fromEntries(form.entries());

    const { images }: { images?: File } = rawFormData;

    if (images && images.size > 0) {
      const { data, error } = await supabase.storage
        .from("images")
        .upload(images.name + Date.now(), images);

      if (error) {
        throw new Error(`Error uploading image: ${error.message}`);
      }
      const path = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/${data.path}`;
      rawFormData.images = path;
    }

    if (images?.size == 0) {
      delete rawFormData.images;
    }

    const { error, data } = await supabase
      .from("vehicles")
      .update(rawFormData)
      .eq("id", id)
      .select();

    if (error) {
      throw new Error(`Error updating data: ${error.message}`);
    }

    return { msg: "Vehicle updated successfully", data };
  } catch (e) {
    console.error("Error updating vehicle:", e);
    throw e;
  }
}

/**
 * Deletes a vehicle from the database.
 * @param id - The ID of the vehicle to delete.
 * @returns A promise that resolves to an object with a `msg` property indicating the success of the deletion.
 * @throws If there is an error deleting the vehicle.
 */
export async function deleteVehicle(id: number | undefined) {
  // Create a new Supabase client
  const cookiesStore = cookies();
  const supabase = createClient(cookiesStore);
  try {
    const { error, data } = await supabase
      .from("vehicles")
      .delete()
      .eq("id", id)
      .select();
    if (error) {
      throw new Error(`Error deleting data: ${error.message}`);
    }
    return { msg: "Vehicle deleted successfully" };
  } catch (e) {
    console.error("Error deleting vehicle:", e);
    throw e;
  }
}
