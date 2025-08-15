-- Create enum types for the application
CREATE TYPE gender_type AS ENUM ('Male', 'Female', 'Other');
CREATE TYPE payment_mode_type AS ENUM ('Cash', 'UPI', 'Bank Transfer', 'Card');
CREATE TYPE class_type AS ENUM ('Lecture', 'Test');
CREATE TYPE user_role_type AS ENUM ('Admin', 'Staff');

-- Create standards table
CREATE TABLE public.standards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(10) NOT NULL UNIQUE, -- '8th', '9th', '10th', '11th', '12th'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create subjects table
CREATE TABLE public.subjects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create batches table
CREATE TABLE public.batches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  standard_id UUID REFERENCES public.standards(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create fees_plans table
CREATE TABLE public.fees_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  duration_months INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create user_profiles table for additional user data
CREATE TABLE public.user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  full_name VARCHAR(200) NOT NULL,
  role user_role_type DEFAULT 'Staff',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create teachers table
CREATE TABLE public.teachers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id VARCHAR(20) UNIQUE NOT NULL,
  full_name VARCHAR(200) NOT NULL,
  gender gender_type,
  dob DATE,
  contact_number VARCHAR(15),
  email VARCHAR(255),
  address TEXT,
  subjects TEXT[], -- Array of subject names
  joining_date DATE DEFAULT CURRENT_DATE,
  salary DECIMAL(10,2),
  notes TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create students table
CREATE TABLE public.students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id VARCHAR(20) UNIQUE NOT NULL,
  full_name VARCHAR(200) NOT NULL,
  gender gender_type,
  dob DATE,
  parent_name VARCHAR(200),
  contact_number VARCHAR(15),
  email VARCHAR(255),
  address TEXT,
  standard_id UUID REFERENCES public.standards(id),
  batch_id UUID REFERENCES public.batches(id),
  joining_date DATE DEFAULT CURRENT_DATE,
  profile_photo_url TEXT,
  fees_plan_id UUID REFERENCES public.fees_plans(id),
  fees_paid DECIMAL(10,2) DEFAULT 0,
  pending_fees DECIMAL(10,2) DEFAULT 0,
  notes TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create classes table
CREATE TABLE public.classes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id VARCHAR(20) UNIQUE NOT NULL,
  standard_id UUID REFERENCES public.standards(id),
  subject_id UUID REFERENCES public.subjects(id),
  teacher_id UUID REFERENCES public.teachers(id),
  batch_id UUID REFERENCES public.batches(id),
  class_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  class_type class_type DEFAULT 'Lecture',
  notes TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create fee_payments table
CREATE TABLE public.fee_payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES public.students(id) ON DELETE CASCADE,
  amount_paid DECIMAL(10,2) NOT NULL,
  payment_date DATE DEFAULT CURRENT_DATE,
  payment_mode payment_mode_type DEFAULT 'Cash',
  receipt_no VARCHAR(50),
  notes TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create storage buckets for media files
INSERT INTO storage.buckets (id, name, public) VALUES 
  ('profile-photos', 'profile-photos', true),
  ('documents', 'documents', false);

-- Enable RLS on all tables
ALTER TABLE public.standards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fees_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fee_payments ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for authenticated users
CREATE POLICY "Allow authenticated read access" ON public.standards FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated write access" ON public.standards FOR ALL TO authenticated USING (true);

CREATE POLICY "Allow authenticated read access" ON public.subjects FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated write access" ON public.subjects FOR ALL TO authenticated USING (true);

CREATE POLICY "Allow authenticated read access" ON public.batches FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated write access" ON public.batches FOR ALL TO authenticated USING (true);

CREATE POLICY "Allow authenticated read access" ON public.fees_plans FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated write access" ON public.fees_plans FOR ALL TO authenticated USING (true);

CREATE POLICY "Users can view their own profile" ON public.user_profiles FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can update their own profile" ON public.user_profiles FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own profile" ON public.user_profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Allow authenticated read access" ON public.teachers FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated write access" ON public.teachers FOR ALL TO authenticated USING (true);

CREATE POLICY "Allow authenticated read access" ON public.students FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated write access" ON public.students FOR ALL TO authenticated USING (true);

CREATE POLICY "Allow authenticated read access" ON public.classes FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated write access" ON public.classes FOR ALL TO authenticated USING (true);

CREATE POLICY "Allow authenticated read access" ON public.fee_payments FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated write access" ON public.fee_payments FOR ALL TO authenticated USING (true);

-- Create storage policies
CREATE POLICY "Profile photos are publicly viewable" ON storage.objects FOR SELECT USING (bucket_id = 'profile-photos');
CREATE POLICY "Users can upload profile photos" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'profile-photos' AND auth.role() = 'authenticated');
CREATE POLICY "Users can update profile photos" ON storage.objects FOR UPDATE USING (bucket_id = 'profile-photos' AND auth.role() = 'authenticated');

CREATE POLICY "Documents are viewable by authenticated users" ON storage.objects FOR SELECT TO authenticated USING (bucket_id = 'documents');
CREATE POLICY "Users can upload documents" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'documents');

-- Function to auto-generate teacher IDs
CREATE OR REPLACE FUNCTION generate_teacher_id()
RETURNS TEXT AS $$
DECLARE
  next_id INTEGER;
  new_teacher_id TEXT;
BEGIN
  SELECT COALESCE(MAX(CAST(SUBSTRING(teacher_id FROM 3) AS INTEGER)), 0) + 1
  INTO next_id
  FROM public.teachers
  WHERE teacher_id ~ '^T[0-9]+$';
  
  new_teacher_id := 'T' || LPAD(next_id::TEXT, 4, '0');
  RETURN new_teacher_id;
END;
$$ LANGUAGE plpgsql;

-- Function to auto-generate student IDs
CREATE OR REPLACE FUNCTION generate_student_id()
RETURNS TEXT AS $$
DECLARE
  next_id INTEGER;
  new_student_id TEXT;
BEGIN
  SELECT COALESCE(MAX(CAST(SUBSTRING(student_id FROM 3) AS INTEGER)), 0) + 1
  INTO next_id
  FROM public.students
  WHERE student_id ~ '^S[0-9]+$';
  
  new_student_id := 'S' || LPAD(next_id::TEXT, 4, '0');
  RETURN new_student_id;
END;
$$ LANGUAGE plpgsql;

-- Function to auto-generate class IDs
CREATE OR REPLACE FUNCTION generate_class_id()
RETURNS TEXT AS $$
DECLARE
  next_id INTEGER;
  new_class_id TEXT;
BEGIN
  SELECT COALESCE(MAX(CAST(SUBSTRING(class_id FROM 3) AS INTEGER)), 0) + 1
  INTO next_id
  FROM public.classes
  WHERE class_id ~ '^C[0-9]+$';
  
  new_class_id := 'C' || LPAD(next_id::TEXT, 4, '0');
  RETURN new_class_id;
END;
$$ LANGUAGE plpgsql;

-- Triggers to auto-generate IDs
CREATE OR REPLACE FUNCTION set_teacher_id()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.teacher_id IS NULL OR NEW.teacher_id = '' THEN
    NEW.teacher_id := generate_teacher_id();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_set_teacher_id
  BEFORE INSERT ON public.teachers
  FOR EACH ROW
  EXECUTE FUNCTION set_teacher_id();

CREATE OR REPLACE FUNCTION set_student_id()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.student_id IS NULL OR NEW.student_id = '' THEN
    NEW.student_id := generate_student_id();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_set_student_id
  BEFORE INSERT ON public.students
  FOR EACH ROW
  EXECUTE FUNCTION set_student_id();

CREATE OR REPLACE FUNCTION set_class_id()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.class_id IS NULL OR NEW.class_id = '' THEN
    NEW.class_id := generate_class_id();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_set_class_id
  BEFORE INSERT ON public.classes
  FOR EACH ROW
  EXECUTE FUNCTION set_class_id();

-- Function to auto-create user profile
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (user_id, full_name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.email),
    'Staff'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Function to update timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add update triggers
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON public.user_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_teachers_updated_at BEFORE UPDATE ON public.teachers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_students_updated_at BEFORE UPDATE ON public.students FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_classes_updated_at BEFORE UPDATE ON public.classes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert default data
INSERT INTO public.standards (name) VALUES 
  ('8th'), ('9th'), ('10th'), ('11th'), ('12th');

INSERT INTO public.subjects (name) VALUES 
  ('Mathematics'), ('Physics'), ('Chemistry'), ('Biology'), ('English'), ('Hindi'), ('Social Science'), ('Computer Science');

INSERT INTO public.fees_plans (name, amount, duration_months) VALUES 
  ('Monthly Plan', 2000.00, 1),
  ('Quarterly Plan', 5500.00, 3),
  ('Half Yearly Plan', 10000.00, 6),
  ('Annual Plan', 18000.00, 12);