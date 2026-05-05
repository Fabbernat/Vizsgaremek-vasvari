-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.meals (
  id integer GENERATED ALWAYS AS IDENTITY NOT NULL,
  name character varying NOT NULL DEFAULT 'Napi menü'::character varying CHECK (char_length(name::text) >= 2),
  description character varying NOT NULL DEFAULT 'Frissen készített, ízletes fogás'::character varying CHECK (char_length(description::text) >= 3),
  price integer NOT NULL DEFAULT 1000 CHECK (price >= 0),
  restaurant_id integer NOT NULL,
  image_url text DEFAULT 'placeholder.jpg'::text,
  CONSTRAINT meals_pkey PRIMARY KEY (id),
  CONSTRAINT meals_restaurant_id_fkey FOREIGN KEY (restaurant_id) REFERENCES public.restaurants(id)
);
CREATE TABLE public.order_items (
  id integer GENERATED ALWAYS AS IDENTITY NOT NULL,
  order_id integer NOT NULL,
  meal_id integer NOT NULL,
  restaurant_id integer NOT NULL,
  quantity integer NOT NULL DEFAULT 1 CHECK (quantity > 0),
  unit_price integer NOT NULL CHECK (unit_price >= 0),
  CONSTRAINT order_items_pkey PRIMARY KEY (id),
  CONSTRAINT order_items_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id),
  CONSTRAINT order_items_meal_id_fkey FOREIGN KEY (meal_id) REFERENCES public.meals(id)
);
CREATE TABLE public.orders (
  id integer GENERATED ALWAYS AS IDENTITY NOT NULL,
  restaurant_id integer NOT NULL,
  user_id integer NOT NULL,
  ordered_at timestamp with time zone NOT NULL DEFAULT now(),
  delivered boolean NOT NULL DEFAULT false,
  status character varying NOT NULL DEFAULT 'pending'::character varying,
  CONSTRAINT orders_pkey PRIMARY KEY (id),
  CONSTRAINT orders_restaurant_id_fkey FOREIGN KEY (restaurant_id) REFERENCES public.restaurants(id),
  CONSTRAINT orders_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id)
);
CREATE TABLE public.restaurants (
  id integer GENERATED ALWAYS AS IDENTITY NOT NULL,
  name character varying NOT NULL DEFAULT 'Royal Bistro'::character varying CHECK (char_length(name::text) >= 2),
  owner_id integer NOT NULL,
  CONSTRAINT restaurants_pkey PRIMARY KEY (id),
  CONSTRAINT restaurants_owner_id_fkey FOREIGN KEY (owner_id) REFERENCES public.users(id)
);
CREATE TABLE public.shops (
  id integer GENERATED ALWAYS AS IDENTITY NOT NULL,
  name character varying NOT NULL DEFAULT 'Royal Shop'::character varying CHECK (char_length(name::text) >= 2),
  owner_id integer NOT NULL,
  CONSTRAINT shops_pkey PRIMARY KEY (id),
  CONSTRAINT shops_owner_id_fkey FOREIGN KEY (owner_id) REFERENCES public.users(id)
);
CREATE TABLE public.users (
  id integer GENERATED ALWAYS AS IDENTITY NOT NULL,
  username character varying NOT NULL UNIQUE CHECK (char_length(username::text) >= 3),
  first_name character varying NOT NULL DEFAULT 'Jakab'::character varying CHECK (char_length(first_name::text) >= 1),
  last_name character varying NOT NULL DEFAULT 'Gipsz'::character varying CHECK (char_length(last_name::text) >= 1),
  email character varying NOT NULL UNIQUE CHECK (POSITION(('@'::text) IN (email)) > 1),
  password_hash text NOT NULL CHECK (char_length(password_hash) >= 20),
  address character varying NOT NULL DEFAULT 'Szeged, Roosevelt tér 1.'::character varying CHECK (char_length(address::text) >= 5),
  role character varying NOT NULL DEFAULT 'user'::character varying CHECK (role::text = ANY (ARRAY['user'::character varying, 'owner'::character varying, 'admin'::character varying, 'courier'::character varying, 'customer'::character varying]::text[])),
  CONSTRAINT users_pkey PRIMARY KEY (id)
);