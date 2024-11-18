import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Option = {
  text: string;
  value: any;
};
type IProps = {
  options: Option[];
  value: any;
  className?: string;
  onValueChange: (e: any) => void;
};

function SelectCustom(props: IProps) {
  const { options, value, className, onValueChange } = props;
  return (
    <div className={className}>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger>
          <SelectValue placeholder="" />
        </SelectTrigger>
        <SelectContent>
          {options?.length > 0 &&
            options.map((option, index: number) => {
              return (
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                <SelectItem key={index} value={option.value}>
                  {option.text}
                </SelectItem>
              );
            })}
        </SelectContent>
      </Select>
    </div>
  );
}

export default SelectCustom;
