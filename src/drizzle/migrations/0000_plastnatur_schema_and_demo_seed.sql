-- PlastNatur Impact Engine prototype schema (demo / mock data only, public access, no auth)
CREATE TABLE public.clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  company text,
  logo_url text,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE public.events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  name text NOT NULL,
  location text,
  event_date date NOT NULL DEFAULT current_date,
  start_time time,
  end_time time,
  expected_participants integer DEFAULT 0,
  actual_participants integer DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE public.event_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid NOT NULL UNIQUE REFERENCES public.events(id) ON DELETE CASCADE,
  impact_score numeric, plastic_avoided numeric, co2_avoided numeric,
  microplastics_avoided numeric, ecotoxicity_avoided numeric, tei numeric,
  return_rate numeric, contamination numeric, reuse_cycles numeric,
  community_participation_score numeric, adoption_speed numeric, consistency numeric,
  volunteers_staff integer, compost_generated numeric,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE public.event_locations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  location_name text NOT NULL,
  recovery_rate numeric,
  returns integer,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE public.badges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  achieved boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.clients, public.events, public.event_metrics, public.event_locations, public.badges TO anon, authenticated;
GRANT ALL ON public.clients, public.events, public.event_metrics, public.event_locations, public.badges TO service_role;
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.badges ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public demo access" ON public.clients FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Public demo access" ON public.events FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Public demo access" ON public.event_metrics FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Public demo access" ON public.event_locations FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Public demo access" ON public.badges FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

-- Demo seed (fictitious data)
INSERT INTO public.clients(name, company) VALUES
 ('Green Festival','Green Festival Lda'),('Eco Corporate','Eco Corporate SA'),('Circular Events','Circular Events Group');

INSERT INTO public.events(client_id,name,location,event_date,start_time,end_time,expected_participants,actual_participants)
SELECT c.id, v.ename, v.loc, v.d::date, v.st::time, v.et::time, v.exp, v.act
FROM (VALUES
 ('Green Festival','Green Festival Lisboa','Lisboa','2025-03-15','16:00','23:00',6000,4941),
 ('Green Festival','Green Festival Porto','Porto','2025-05-24','14:00','23:00',6000,5441),
 ('Green Festival','Green Summer Fest','Algarve','2025-07-19','16:00','02:00',2500,2371),
 ('Green Festival','Green Festival Outono','Lisboa','2025-10-11','14:00','23:00',4000,4063),
 ('Green Festival','Green Festival 2026','Lisboa','2026-03-21','14:00','23:00',6000,5388),
 ('Eco Corporate','Eco Summit','Lisboa','2025-03-08','09:00','18:00',800,742),
 ('Eco Corporate','Eco Corporate Day','Oeiras','2025-06-12','10:00','19:00',1500,1388),
 ('Eco Corporate','Eco Team Building','Sintra','2025-09-18','10:00','17:00',400,396),
 ('Eco Corporate','Eco Annual Gala','Porto','2025-12-04','19:00','01:00',1200,1104),
 ('Circular Events','Circular Music Night','Coimbra','2025-04-05','20:00','03:00',3000,2710),
 ('Circular Events','Circular Food Market','Braga','2025-06-28','11:00','22:00',2500,2604),
 ('Circular Events','Circular Sports Day','Aveiro','2025-09-06','09:00','19:00',2000,1850),
 ('Circular Events','Circular Expo','Lisboa','2026-02-14','10:00','20:00',5000,4720)
) AS v(cname,ename,loc,d,st,et,exp,act)
JOIN public.clients c ON c.name = v.cname;

INSERT INTO public.event_metrics(event_id,impact_score,plastic_avoided,co2_avoided,microplastics_avoided,ecotoxicity_avoided,tei,return_rate,contamination,reuse_cycles,community_participation_score,adoption_speed,consistency,volunteers_staff,compost_generated)
SELECT e.id, v.imp, v.pl, round(v.pl*2.4,1),
  CASE WHEN v.val THEN round(v.pl*0.012,2) END,
  CASE WHEN v.val AND v.imp > 75 THEN round(v.tei/120.0,2) END,
  v.tei, v.rr, v.ct, v.cy, v.cps, v.ad, v.cs, v.st, round(v.pl*0.38,1)
FROM (VALUES
 ('Green Festival Lisboa',61,309.0,58.6,74.2,18.1,3.6,59,58,63,22,false),
 ('Green Festival Porto',67,341.7,63.5,79.2,15.5,4.1,64,63,68,30,false),
 ('Green Summer Fest',73,168.1,67.0,83.0,12.9,4.7,68,69,71,18,true),
 ('Green Festival Outono',82,319.9,72.6,88.4,8.6,5.3,76,74,78,26,true),
 ('Green Festival 2026',86,380.3,76.4,91.1,7.3,6.1,81,79,83,34,true),
 ('Eco Summit',64,52.1,57.2,72.3,16.2,3.4,58,62,66,8,false),
 ('Eco Corporate Day',70,96.4,62.8,80.1,13.4,4.0,63,67,70,12,false),
 ('Eco Team Building',75,27.5,66.0,86.0,9.8,4.4,72,71,74,6,true),
 ('Eco Annual Gala',79,78.2,69.1,87.5,9.1,5.0,74,73,77,14,true),
 ('Circular Music Night',58,189.6,54.0,68.9,21.4,3.1,55,54,58,20,false),
 ('Circular Food Market',69,208.3,61.2,77.6,14.8,3.9,66,64,67,24,true),
 ('Circular Sports Day',74,129.5,65.4,82.4,11.2,4.5,70,70,72,19,true),
 ('Circular Expo',81,330.4,71.8,86.9,9.4,5.2,77,76,80,28,true)
) AS v(ename,imp,pl,tei,rr,ct,cy,cps,ad,cs,st,val)
JOIN public.events e ON e.name = v.ename;

INSERT INTO public.event_locations(event_id,location_name,recovery_rate,returns)
SELECT e.id, l.name,
  least(98, greatest(50, round(m.return_rate + ((ascii(substr(e.name,l.ord,1)) * 7 + l.ord * 13) % 25) - 12, 1))),
  round(e.actual_participants * 0.9 / n.cnt * (0.7 + ((l.ord * 37 + length(e.name)) % 7) / 10.0))
FROM public.events e
JOIN public.event_metrics m ON m.event_id = e.id
JOIN LATERAL (SELECT CASE WHEN e.name = 'Eco Team Building' THEN 1
                          WHEN e.actual_participants > 4000 THEN 5
                          WHEN e.actual_participants > 1500 THEN 4 ELSE 3 END AS cnt) n ON true
JOIN (VALUES (1,'Entrada Principal'),(2,'Palco A'),(3,'Food Court'),(4,'Zona VIP'),(5,'Bar Central')) AS l(ord,name)
  ON l.ord <= n.cnt;

INSERT INTO public.badges(event_id,name,description,achieved)
SELECT m.event_id, b.name, b.descr, true
FROM public.event_metrics m
JOIN (VALUES
 ('Gold Circularity','Taxa de devolução acima da meta de 85%'),
 ('Low Contamination','Contaminação abaixo de 10%'),
 ('Gold Community','Participação comunitária excecional'),
 ('Carbon Champion','Mais de 700 kg CO₂e evitados'),
 ('Science Excellence','Dados integrados em estudo científico'),
 ('Operational Excellence','Operação com consistência elevada')
) AS b(name,descr) ON
 (b.name='Gold Circularity' AND m.return_rate >= 85) OR
 (b.name='Low Contamination' AND m.contamination < 10) OR
 (b.name='Gold Community' AND m.community_participation_score >= 70) OR
 (b.name='Carbon Champion' AND m.co2_avoided >= 700) OR
 (b.name='Science Excellence' AND m.microplastics_avoided IS NOT NULL) OR
 (b.name='Operational Excellence' AND m.consistency >= 75);