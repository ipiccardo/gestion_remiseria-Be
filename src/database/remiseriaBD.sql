--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1
-- Dumped by pg_dump version 16.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: empleado; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.empleado (
    id integer NOT NULL,
    nombre character varying(20),
    apellido character varying(20),
    dni integer NOT NULL
);


ALTER TABLE public.empleado OWNER TO postgres;

--
-- Name: empleado_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.empleado_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.empleado_id_seq OWNER TO postgres;

--
-- Name: empleado_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.empleado_id_seq OWNED BY public.empleado.id;


--
-- Name: empleado_licencia; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.empleado_licencia (
    id integer NOT NULL,
    id_empleado integer NOT NULL,
    id_licencia integer NOT NULL,
    fecha_emision date NOT NULL,
    vigente boolean NOT NULL
);


ALTER TABLE public.empleado_licencia OWNER TO postgres;

--
-- Name: empleado_licencia_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.empleado_licencia_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.empleado_licencia_id_seq OWNER TO postgres;

--
-- Name: empleado_licencia_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.empleado_licencia_id_seq OWNED BY public.empleado_licencia.id;


--
-- Name: licencia; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.licencia (
    id integer NOT NULL,
    tipo character varying(20) NOT NULL,
    duracion integer NOT NULL
);


ALTER TABLE public.licencia OWNER TO postgres;

--
-- Name: licencia_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.licencia_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.licencia_id_seq OWNER TO postgres;

--
-- Name: licencia_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.licencia_id_seq OWNED BY public.licencia.id;


--
-- Name: salario; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.salario (
    id integer DEFAULT nextval('public.empleado_id_seq'::regclass) NOT NULL,
    salario numeric NOT NULL,
    periodo date NOT NULL,
    id_empleado integer NOT NULL,
    CONSTRAINT check_salario CHECK ((salario > (0)::numeric))
);


ALTER TABLE public.salario OWNER TO postgres;

--
-- Name: vehiculo; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.vehiculo (
    id integer DEFAULT nextval('public.empleado_licencia_id_seq'::regclass) NOT NULL,
    dominio character varying(10) NOT NULL,
    marca character varying(20) NOT NULL,
    modelo character varying(25) NOT NULL,
    anio integer,
    kilometraje real NOT NULL,
    estado boolean DEFAULT false NOT NULL,
    id_empleado integer,
    kilometros_restantes real DEFAULT 0
);


ALTER TABLE public.vehiculo OWNER TO postgres;

--
-- Name: vehiculo_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.vehiculo_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.vehiculo_id_seq OWNER TO postgres;

--
-- Name: vehiculo_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.vehiculo_id_seq OWNED BY public.vehiculo.id;


--
-- Name: viaje; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.viaje (
    fecha timestamp with time zone NOT NULL,
    kilometros real NOT NULL,
    id_vehiculo integer NOT NULL,
    id_empleado integer NOT NULL,
    id integer NOT NULL,
    precio_kilometro real
);


ALTER TABLE public.viaje OWNER TO postgres;

--
-- Name: viaje_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.viaje_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.viaje_id_seq OWNER TO postgres;

--
-- Name: viaje_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.viaje_id_seq OWNED BY public.viaje.id;


--
-- Name: empleado id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.empleado ALTER COLUMN id SET DEFAULT nextval('public.empleado_id_seq'::regclass);


--
-- Name: empleado_licencia id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.empleado_licencia ALTER COLUMN id SET DEFAULT nextval('public.empleado_licencia_id_seq'::regclass);


--
-- Name: licencia id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.licencia ALTER COLUMN id SET DEFAULT nextval('public.licencia_id_seq'::regclass);


--
-- Name: viaje id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.viaje ALTER COLUMN id SET DEFAULT nextval('public.viaje_id_seq'::regclass);


--
-- Data for Name: empleado; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.empleado (id, nombre, apellido, dni) FROM stdin;
\.


--
-- Data for Name: empleado_licencia; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.empleado_licencia (id, id_empleado, id_licencia, fecha_emision, vigente) FROM stdin;
\.


--
-- Data for Name: licencia; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.licencia (id, tipo, duracion) FROM stdin;
1	Profesional	5
2	Estandar	1
\.


--
-- Data for Name: salario; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.salario (id, salario, periodo, id_empleado) FROM stdin;
\.


--
-- Data for Name: vehiculo; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.vehiculo (id, dominio, marca, modelo, anio, kilometraje, estado, id_empleado, kilometros_restantes) FROM stdin;
\.


--
-- Data for Name: viaje; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.viaje (fecha, kilometros, id_vehiculo, id_empleado, id, precio_kilometro) FROM stdin;
\.


--
-- Name: empleado_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.empleado_id_seq', 42, true);


--
-- Name: empleado_licencia_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.empleado_licencia_id_seq', 27, true);


--
-- Name: licencia_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.licencia_id_seq', 2, true);


--
-- Name: vehiculo_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.vehiculo_id_seq', 1, true);


--
-- Name: viaje_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.viaje_id_seq', 44, true);


--
-- Name: empleado empleado_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.empleado
    ADD CONSTRAINT empleado_pkey PRIMARY KEY (id);


--
-- Name: licencia licencia_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.licencia
    ADD CONSTRAINT licencia_pkey PRIMARY KEY (id);


--
-- Name: empleado_licencia pk_id_licencia; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.empleado_licencia
    ADD CONSTRAINT pk_id_licencia PRIMARY KEY (id) INCLUDE (id);


--
-- Name: salario salario_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.salario
    ADD CONSTRAINT salario_pkey PRIMARY KEY (id);


--
-- Name: empleado unique_dni; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.empleado
    ADD CONSTRAINT unique_dni UNIQUE (dni) INCLUDE (dni);


--
-- Name: vehiculo unique_dominio; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vehiculo
    ADD CONSTRAINT unique_dominio UNIQUE (dominio) INCLUDE (dominio);


--
-- Name: vehiculo vehiculo_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vehiculo
    ADD CONSTRAINT vehiculo_pkey PRIMARY KEY (id);


--
-- Name: viaje viaje_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.viaje
    ADD CONSTRAINT viaje_pkey PRIMARY KEY (id) INCLUDE (id);


--
-- Name: fki_fk_id_licencia; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_fk_id_licencia ON public.empleado_licencia USING btree (id_licencia);


--
-- Name: fki_fk_id_salario; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_fk_id_salario ON public.salario USING btree (id_empleado);


--
-- Name: empleado_licencia fk_id_empleado; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.empleado_licencia
    ADD CONSTRAINT fk_id_empleado FOREIGN KEY (id_empleado) REFERENCES public.empleado(id) NOT VALID;


--
-- Name: viaje fk_id_empleado; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.viaje
    ADD CONSTRAINT fk_id_empleado FOREIGN KEY (id_empleado) REFERENCES public.empleado(id);


--
-- Name: empleado_licencia fk_id_licencia; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.empleado_licencia
    ADD CONSTRAINT fk_id_licencia FOREIGN KEY (id_licencia) REFERENCES public.licencia(id) NOT VALID;


--
-- Name: salario fk_id_salario; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.salario
    ADD CONSTRAINT fk_id_salario FOREIGN KEY (id_empleado) REFERENCES public.empleado(id) NOT VALID;


--
-- Name: viaje fk_id_vehiculo; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.viaje
    ADD CONSTRAINT fk_id_vehiculo FOREIGN KEY (id_vehiculo) REFERENCES public.vehiculo(id);


--
-- PostgreSQL database dump complete
--

